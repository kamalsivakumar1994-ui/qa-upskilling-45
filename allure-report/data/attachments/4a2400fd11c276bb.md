# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: reporting.spec.ts >> Reporting Demo Tests >> Page element checks >> Intentional failure - for report demo
- Location: tests\reporting.spec.ts:79:9

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#auth-username')
Expected: "This text does not exist"
Received: ""
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#auth-username')
    12 × locator resolved to <input value="" type="text" id="auth-username" name="auth-username" placeholder="Username" aria-label="Auth username" data-testid="auth-username" class="input-field practice-input w-full"/>
       - unexpected value ""

```

```yaml
- textbox "Auth username":
  - /placeholder: Username
```

# Test source

```ts
  1  | import { test, expect } from '../fixtures/base.js';
  2  | 
  3  | test.describe('Reporting Demo Tests', () => {
  4  | 
  5  |     test.describe('Login scenarios', () => {
  6  | 
  7  |         test('Valid login - should show dashboard', async ({ loginPage }) => {
  8  | 
  9  |             await test.step('Navigate to login page', async () => {
  10 |                 console.log("Navigating to login page...");
  11 |                 await expect(loginPage.submitButton).toBeVisible();
  12 |             });
  13 | 
  14 |             await test.step('Fill login credentials', async () => {
  15 |                 await loginPage.fillUserName('admin');
  16 |                 await loginPage.fillPassword('admin123');
  17 |                 console.log("Credentials filled!");
  18 |             });
  19 | 
  20 |             await test.step('Click submit and verify', async () => {
  21 |                 await loginPage.clickSubmitBtn();
  22 |                 await expect(loginPage.logMessage).toBeVisible();
  23 |                 console.log("Login successful!");
  24 |             });
  25 |         });
  26 | 
  27 |         test('Invalid login - should show error', async ({ loginPage }) => {
  28 | 
  29 |             await test.step('Navigate to login page', async () => {
  30 |                 await expect(loginPage.submitButton).toBeVisible();
  31 |             });
  32 | 
  33 |             await test.step('Fill wrong credentials', async () => {
  34 |                 await loginPage.fillUserName('wronguser');
  35 |                 await loginPage.fillPassword('wrongpass');
  36 |             });
  37 | 
  38 |             await test.step('Verify error message', async () => {
  39 |                 await loginPage.clickSubmitBtn();
  40 |                 await expect(loginPage.errorMessage).toBeVisible();
  41 |                 let errorText = await loginPage.getErrorMessage();
  42 |                 console.log("Error:", errorText);
  43 |             });
  44 |         });
  45 | 
  46 |         test('Empty login - should show error', async ({ loginPage }) => {
  47 | 
  48 |             await test.step('Click submit without credentials', async () => {
  49 |                 await loginPage.clickSubmitBtn();
  50 |             });
  51 | 
  52 |             await test.step('Verify error appears', async () => {
  53 |                 await expect(loginPage.errorMessage).toBeVisible();
  54 |                 console.log("Empty credentials error shown!");
  55 |             });
  56 |         });
  57 |     });
  58 | 
  59 |     test.describe('Page element checks', () => {
  60 | 
  61 |         test('Login page has all elements', async ({ loginPage }) => {
  62 | 
  63 |             await test.step('Check username field', async () => {
  64 |                 await expect(loginPage.usernameField).toBeVisible();
  65 |                 console.log("Username field visible!");
  66 |             });
  67 | 
  68 |             await test.step('Check password field', async () => {
  69 |                 await expect(loginPage.passwordField).toBeVisible();
  70 |                 console.log("Password field visible!");
  71 |             });
  72 | 
  73 |             await test.step('Check submit button', async () => {
  74 |                 await expect(loginPage.submitButton).toBeVisible();
  75 |                 console.log("Submit button visible!");
  76 |             });
  77 |         });
  78 | 
  79 |         test('Intentional failure - for report demo', async ({ loginPage }) => {
  80 | 
  81 |             await test.step('This step will pass', async () => {
  82 |                 await expect(loginPage.submitButton).toBeVisible();
  83 |                 console.log("Step 1 passed!");
  84 |             });
  85 | 
  86 |             await test.step('This step will fail intentionally', async () => {
  87 |                 await expect(
  88 |                     loginPage.usernameField
> 89 |                 ).toHaveText('This text does not exist');
     |                   ^ Error: expect(locator).toHaveText(expected) failed
  90 |             });
  91 |         });
  92 |     });
  93 | });
```