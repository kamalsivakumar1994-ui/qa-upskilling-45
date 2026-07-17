import{test,expect} from "@playwright/test"
import { EXT_SUBCOMMAND_LIST } from "appium/build/lib/constants.js";
import { emit } from "node:cluster";
const BASE_URL='https://reqres.in/api';
const API_KEY='free_user_3GXmPa8nz1pxhhbQBNGciXPOYAx';

test.describe('Users API',()=>{
    test('GET Users list returns 200 and an array', async({request})=>{
        const response = await request.get(`${BASE_URL}/users?page=2`,{
            headers:{'x-api-key':API_KEY}
        });
        expect(response.status()).toBe(200);

  const body = await response.json();
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
  });

});

    test('GET single user returns 200 and email id', async({request})=>{
        const response = await request.get(`${BASE_URL}/users/2`,{
            headers:{'x-api-key': API_KEY}
        });

       expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data).toHaveProperty('email');
  });

  test('POST create user returns 201 with generated id', async({request})=>{
    const response =await request.post(`${BASE_URL}/users`,{
        headers:{'x-api-key': API_KEY},
        data: {
            name:'Kamal',
            job: 'QA'
        }
    });
    expect(response.status()).toBe(201);
    const body= await response.json();
    expect(body).toHaveProperty('id');
    expect(body.name).toBe('Kamal');
    expect(body.job).toBe('QA');
  });

  test('DELETE user returns 204', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/2`, {
      headers: { 'x-api-key': API_KEY }
    });

    expect(response.status()).toBe(204);
  });

  test('GET non-existent user returns 404', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/999`, {
      headers: { 'x-api-key': API_KEY }
    });

    expect(response.status()).toBe(404);
  });

  test.describe('auth tests',()=>{
      test('POST Login with valid credentials return a token', async({request})=>{
        const response= await request.post(`${BASE_URL}/login`,{
          headers:{'x-api-key': API_KEY},
          data:{
            email: 'Test@gmail.com',
            password: 'Test@123456'

          }
        });

      expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
  });
  
test('POST login with missing password returns 400', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/login`, {
      headers: { 'x-api-key': API_KEY },
      data: {
        email: 'eve.holt@reqres.in'
        // password deliberately missing
      }
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body).toHaveProperty('error');
  });

});

test.describe('Negative tests - missing auth', () => {

  test('GET users without API key returns 401', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`);
    // note: no headers sent at all here

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body.error).toBe('missing_api_key');
  });

  test('GET users with invalid API key returns 401', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`, {
      headers: { 'x-api-key': 'totally_fake_invalid_key_12345' }
    });

    expect(response.status()).toBe(401);
  });

});
function assertUserSchema(user: any) {
  expect(typeof user.id).toBe('number');
  expect(typeof user.email).toBe('string');
  expect(typeof user.first_name).toBe('string');
  expect(typeof user.last_name).toBe('string');
  expect(typeof user.avatar).toBe('string');
}

test.describe('Schema validation', () => {

  test('Single user matches expected schema', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`, {
      headers: { 'x-api-key': API_KEY }
    });

    const body = await response.json();
    assertUserSchema(body.data);
  });

  test('Every user in list matches expected schema', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=2`, {
      headers: { 'x-api-key': API_KEY }
    });

    const body = await response.json();

    for (const user of body.data) {
      assertUserSchema(user);
    }
  });

});