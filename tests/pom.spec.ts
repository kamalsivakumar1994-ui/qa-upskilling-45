import { expect } from '@playwright/test';
import { test } from '../fixtures/base.js';
import testData from '../test-data/users.json' with { type: 'json' };

test.describe('Login Tests', () => {

    test('Valid login using fixture', async ({ loggedInPage }) => {
        console.log("Fixture logged us in automatically!");

        let successMessage = await loggedInPage.getSuccessMessage();
        await expect(loggedInPage.logMessage).toBeVisible();

        console.log("Valid login test passed!");
    });

    test('Login page ready using fixture', async ({ loginPage }) => {
        console.log("Fixture navigated to login page automatically!");

        await expect(loginPage.submitButton).toBeVisible();
        await expect(loginPage.usernameField).toBeVisible();

        console.log("Login page ready test passed!");
    });

    for (const user of testData.invalidUsers) {
        test(`Invalid login - ${user.description}`, async ({ loginPage }) => {
            console.log(`Testing: ${user.description}`);

            await loginPage.login(user.username, user.password);

            let errorMessage = await loginPage.getErrorMessage();
            await expect(loginPage.errorMessage).toBeVisible();

            console.log(`Passed: ${user.description}`);
        });
    }
});