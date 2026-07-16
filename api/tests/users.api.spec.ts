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

