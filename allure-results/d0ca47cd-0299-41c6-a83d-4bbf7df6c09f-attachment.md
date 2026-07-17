# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ..\api\tests\users.api.spec.ts >> Users API >> GET Users list returns 200 and an array
- Location: api\tests\users.api.spec.ts:6:5

# Error details

```
TypeError: apiRequestContext.get: Invalid URL
```

# Test source

```ts
  1  | import{test,expect} from "@playwright/test"
  2  | const BASE_URL='https://reqres.in/api';
  3  | const API_KEY='free_user_3GXmPa8nz1pxhhbQBNGciXPOYAx';
  4  | 
  5  | test.describe('Users API',()=>{
  6  |     test('GET Users list returns 200 and an array', async({request})=>{
> 7  |         const response = await request.get('${BASE_URL}/users?page=2',{
     |                                        ^ TypeError: apiRequestContext.get: Invalid URL
  8  |             headers:{'x-api-key':API_KEY}
  9  |         });
  10 |         expect(response.status()).toBe(200);
  11 | 
  12 |         
  13 |     })
  14 | })
```