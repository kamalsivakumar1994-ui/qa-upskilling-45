# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ..\api\tests\users.api.spec.ts >> GET single user returns 200 and email id
- Location: api\tests\users.api.spec.ts:21:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: undefined
```

# Test source

```ts
  1  | import{test,expect} from "@playwright/test"
  2  | import { EXT_SUBCOMMAND_LIST } from "appium/build/lib/constants.js";
  3  | import { emit } from "node:cluster";
  4  | const BASE_URL='https://reqres.in/api';
  5  | const API_KEY='free_user_3GXmPa8nz1pxhhbQBNGciXPOYAx';
  6  | 
  7  | test.describe('Users API',()=>{
  8  |     test('GET Users list returns 200 and an array', async({request})=>{
  9  |         const response = await request.get(`${BASE_URL}/users?page=2`,{
  10 |             headers:{'x-api-key':API_KEY}
  11 |         });
  12 |         expect(response.status()).toBe(200);
  13 | 
  14 |   const body = await response.json();
  15 |     expect(Array.isArray(body.data)).toBe(true);
  16 |     expect(body.data.length).toBeGreaterThan(0);
  17 |   });
  18 | 
  19 | });
  20 | 
  21 |     test('GET single user returns 200 and email id', async({request})=>{
  22 |         const response = await request.get(`${BASE_URL}/users?page=2`,{
  23 |             headers:{'x-api-key': API_KEY}
  24 |         });
  25 | 
  26 |        expect(response.status()).toBe(200);
  27 | 
  28 |     const body = await response.json();
> 29 |     expect(body.data.id).toBe(2);
     |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  30 |     expect(body.data).toHaveProperty('email');
  31 |   });
```