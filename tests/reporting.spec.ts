import { test, expect } from '../fixtures/base.js';

test.describe('Reporting Demo Tests', () => {

    test.describe('Login scenarios', () => {

        test('Valid login - should show dashboard', async ({ loginPage }) => {

            await test.step('Navigate to login page', async () => {
                console.log("Navigating to login page...");
                await expect(loginPage.submitButton).toBeVisible();
            });

            await test.step('Fill login credentials', async () => {
                await loginPage.fillUserName('admin');
                await loginPage.fillPassword('admin123');
                console.log("Credentials filled!");
            });

            await test.step('Click submit and verify', async () => {
                await loginPage.clickSubmitBtn();
                await expect(loginPage.logMessage).toBeVisible();
                console.log("Login successful!");
            });
        });

        test('Invalid login - should show error', async ({ loginPage }) => {

            await test.step('Navigate to login page', async () => {
                await expect(loginPage.submitButton).toBeVisible();
            });

            await test.step('Fill wrong credentials', async () => {
                await loginPage.fillUserName('wronguser');
                await loginPage.fillPassword('wrongpass');
            });

            await test.step('Verify error message', async () => {
                await loginPage.clickSubmitBtn();
                await expect(loginPage.errorMessage).toBeVisible();
                let errorText = await loginPage.getErrorMessage();
                console.log("Error:", errorText);
            });
        });

        test('Empty login - should show error', async ({ loginPage }) => {

            await test.step('Click submit without credentials', async () => {
                await loginPage.clickSubmitBtn();
            });

            await test.step('Verify error appears', async () => {
                await expect(loginPage.errorMessage).toBeVisible();
                console.log("Empty credentials error shown!");
            });
        });
    });

    test.describe('Page element checks', () => {

        test('Login page has all elements', async ({ loginPage }) => {

            await test.step('Check username field', async () => {
                await expect(loginPage.usernameField).toBeVisible();
                console.log("Username field visible!");
            });

            await test.step('Check password field', async () => {
                await expect(loginPage.passwordField).toBeVisible();
                console.log("Password field visible!");
            });

            await test.step('Check submit button', async () => {
                await expect(loginPage.submitButton).toBeVisible();
                console.log("Submit button visible!");
            });
        });

        test('Intentional failure - for report demo', async ({ loginPage }) => {

            await test.step('This step will pass', async () => {
                await expect(loginPage.submitButton).toBeVisible();
                console.log("Step 1 passed!");
            });

            await test.step('This step will fail intentionally', async () => {
                await expect(
                    loginPage.usernameField
                ).toHaveText('This text does not exist');
            });
        });
    });
});