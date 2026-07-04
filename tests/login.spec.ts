import{test,expect} from '@playwright/test';

test('Login with Valid credentials',async({page})=>{
    console.log("Step 1: Going to saucedemo.com");
    await page.goto('https://www.saucedemo.com');

    console.log("Step 2: Filling username");
    await page.locator('#user-name').fill('standard_user');

    console.log("Step 3: Filling password");
    await page.locator('#password').fill('secret_sauce');

    console.log("Step 4: Clicking login button");
    await page.locator('#login-button').click();

    console.log("Step 5: Checking we are on inventory page");
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    console.log("Test passed!");
});

test('Login with wrong password', async ({ page }) => {

    console.log("Step 1: Going to saucedemo.com");
    await page.goto('https://www.saucedemo.com');

    console.log("Step 2: Filling username");
    await page.locator('#user-name').fill('standard_user');

    console.log("Step 3: Filling wrong password");
    await page.locator('#password').fill('wrong_password');

    console.log("Step 4: Clicking login button");
    await page.locator('#login-button').click();

    console.log("Step 5: Checking error message appears");
    await expect(
        page.locator('[data-test="error"]')
    ).toBeVisible();

    console.log("Test passed!");
});

test('Login with locked user', async ({ page }) => {

    console.log("Step 1: Going to saucedemo.com");
    await page.goto('https://www.saucedemo.com');

    console.log("Step 2: Filling locked username");
    await page.locator('#user-name').fill('locked_out_user');

    console.log("Step 3: Filling password");
    await page.locator('#password').fill('secret_sauce');

    console.log("Step 4: Clicking login button");
    await page.locator('#login-button').click();

    console.log("Step 5: Checking locked error message");
    await expect(
        page.locator('[data-test="error"]')
    ).toContainText('locked out');

    console.log("Test passed!");
});
