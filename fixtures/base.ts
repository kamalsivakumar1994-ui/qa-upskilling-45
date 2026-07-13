import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

type MyFixtures = {
    loginPage: LoginPage;
    loggedInPage: LoginPage;
};

export const test = base.extend<MyFixtures>({

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await use(loginPage);
    },

    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('admin', 'admin123');
        await use(loginPage);
    }
});

export { expect } from '@playwright/test';