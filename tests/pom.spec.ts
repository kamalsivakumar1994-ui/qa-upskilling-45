import{test,expect}from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Login Tests',()=>{
    let loginPage: LoginPage;

    test.beforeEach(async ({page})=>{
        loginPage =new LoginPage(page);
        await loginPage.navigate();
    });

  test('Valid login', async ({ page }) => {
        await loginPage.LoginPage1('admin', 'admin123');
        await loginPage.LoggedinMessageCheck();
        await expect(loginPage.LogMessage).toBeVisible();
        console.log("Valid login test passed!");
    });

    test('invalid login', async({page})=>{
        await loginPage.LoginPage1('adm','jak');
        await loginPage.ErrorLoggedinMessageCheck();
        await expect(loginPage.errorMessage).toBeVisible();
        console.log("InValid login test passed!");
    });
    })


    