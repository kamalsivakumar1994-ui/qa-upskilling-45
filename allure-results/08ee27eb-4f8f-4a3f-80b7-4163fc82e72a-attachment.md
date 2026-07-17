# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ..\api\tests\users.api.spec.ts >> Auth tests >> POST login with valid credentials returns a token
- Location: api\tests\users.api.spec.ts:66:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 400
```

# Test source

```ts
  1   | import{test,expect} from "@playwright/test"
  2   | import { EXT_SUBCOMMAND_LIST } from "appium/build/lib/constants.js";
  3   | import { emit } from "node:cluster";
  4   | const BASE_URL='https://reqres.in/api';
  5   | const API_KEY='free_user_3GXmPa8nz1pxhhbQBNGciXPOYAx';
  6   | 
  7   | test.describe('Users API',()=>{
  8   |     test('GET Users list returns 200 and an array', async({request})=>{
  9   |         const response = await request.get(`${BASE_URL}/users?page=2`,{
  10  |             headers:{'x-api-key':API_KEY}
  11  |         });
  12  |         expect(response.status()).toBe(200);
  13  | 
  14  |   const body = await response.json();
  15  |     expect(Array.isArray(body.data)).toBe(true);
  16  |     expect(body.data.length).toBeGreaterThan(0);
  17  |   });
  18  | 
  19  | });
  20  | 
  21  |     test('GET single user returns 200 and email id', async({request})=>{
  22  |         const response = await request.get(`${BASE_URL}/users/2`,{
  23  |             headers:{'x-api-key': API_KEY}
  24  |         });
  25  | 
  26  |        expect(response.status()).toBe(200);
  27  | 
  28  |     const body = await response.json();
  29  |     expect(body.data.id).toBe(2);
  30  |     expect(body.data).toHaveProperty('email');
  31  |   });
  32  | 
  33  |   test('POST create user returns 201 with generated id', async({request})=>{
  34  |     const response =await request.post(`${BASE_URL}/users`,{
  35  |         headers:{'x-api-key': API_KEY},
  36  |         data: {
  37  |             name:'Kamal',
  38  |             job: 'QA'
  39  |         }
  40  |     });
  41  |     expect(response.status()).toBe(201);
  42  |     const body= await response.json();
  43  |     expect(body).toHaveProperty('id');
  44  |     expect(body.name).toBe('Kamal');
  45  |     expect(body.job).toBe('QA');
  46  |   });
  47  | 
  48  |   test('DELETE user returns 204', async ({ request }) => {
  49  |     const response = await request.delete(`${BASE_URL}/users/2`, {
  50  |       headers: { 'x-api-key': API_KEY }
  51  |     });
  52  | 
  53  |     expect(response.status()).toBe(204);
  54  |   });
  55  | 
  56  |   test('GET non-existent user returns 404', async ({ request }) => {
  57  |     const response = await request.get(`${BASE_URL}/users/999`, {
  58  |       headers: { 'x-api-key': API_KEY }
  59  |     });
  60  | 
  61  |     expect(response.status()).toBe(404);
  62  |   });
  63  | 
  64  |   test.describe('Auth tests', () => {
  65  | 
  66  |   test('POST login with valid credentials returns a token', async ({ request }) => {
  67  |     const response = await request.post(`${BASE_URL}/login`, {
  68  |       headers: { 'x-api-key': API_KEY },
  69  |       data: {
  70  |         email: 'eve.holt@reqres.in',
  71  |         password: 'cityslicka'
  72  |       }
  73  |     });
  74  | 
> 75  |     expect(response.status()).toBe(200);
      |                               ^ Error: expect(received).toBe(expected) // Object.is equality
  76  | 
  77  |     const body = await response.json();
  78  |     expect(body).toHaveProperty('token');
  79  |     expect(typeof body.token).toBe('string');
  80  |   });
  81  | 
  82  |   test('POST login with missing password returns 400', async ({ request }) => {
  83  |     const response = await request.post(`${BASE_URL}/login`, {
  84  |       headers: { 'x-api-key': API_KEY },
  85  |       data: {
  86  |         email: 'eve.holt@reqres.in'
  87  |         // password deliberately missing
  88  |       }
  89  |     });
  90  | 
  91  |     expect(response.status()).toBe(400);
  92  | 
  93  |     const body = await response.json();
  94  |     expect(body).toHaveProperty('error');
  95  |   });
  96  | 
  97  | });
  98  | 
  99  | test.describe('Negative tests - missing auth', () => {
  100 | 
  101 |   test('GET users without API key returns 401', async ({ request }) => {
  102 |     const response = await request.get(`${BASE_URL}/users/2`);
  103 |     // note: no headers sent at all here
  104 | 
  105 |     expect(response.status()).toBe(401);
  106 | 
  107 |     const body = await response.json();
  108 |     expect(body).toHaveProperty('error');
  109 |     expect(body.error).toBe('missing_api_key');
  110 |   });
  111 | 
  112 |   test('GET users with invalid API key returns 401', async ({ request }) => {
  113 |     const response = await request.get(`${BASE_URL}/users/2`, {
  114 |       headers: { 'x-api-key': 'totally_fake_invalid_key_12345' }
  115 |     });
  116 | 
  117 |     expect(response.status()).toBe(401);
  118 |   });
  119 | 
  120 | });
```