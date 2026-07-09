import { test, expect } from '@playwright/test';

test.describe('Login Test Suite', () => {

    test.beforeEach(async ({ page }) => {
        console.log("beforeEach: Going to saucedemo...");
        await page.goto('https://www.saucedemo.com');
    });

    test.afterEach(async ({ page }) => {
        console.log("afterEach: Test finished!");
    });

    test('Valid login', async ({ page }) => {
        console.log("Test: Valid login");

        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(page).toHaveURL(
            'https://www.saucedemo.com/inventory.html'
        );
        await expect(page.locator('.title')).toHaveText('Products');
        await expect(page.locator('.inventory_list')).toBeVisible();

        console.log("Valid login passed!");
    });

    test('Invalid password', async ({ page }) => {
        console.log("Test: Invalid password");

        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('wrong_password');
        await page.locator('#login-button').click();

        await expect(
            page.locator('[data-test="error"]')
        ).toBeVisible();

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText('Username and password do not match');

        await expect(page).toHaveURL('https://www.saucedemo.com');

        console.log("Invalid password test passed!");
    });

    test('Locked user', async ({ page }) => {
        console.log("Test: Locked user");

        await page.locator('#user-name').fill('locked_out_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText('locked out');

        console.log("Locked user test passed!");
    });

    test('Empty username', async ({ page }) => {
        console.log("Test: Empty username");

        await page.locator('#login-button').click();

        await expect(
            page.locator('[data-test="error"]')
        ).toContainText('Username is required');

        console.log("Empty username test passed!");
    });
});

test.describe('Inventory Test Suite', () => {

    test.beforeEach(async ({ page }) => {
        console.log("beforeEach: Logging in...");
        await page.goto('https://www.saucedemo.com');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await page.waitForURL(
            'https://www.saucedemo.com/inventory.html'
        );
        console.log("beforeEach: Logged in!");
    });

    test('Products page loads', async ({ page }) => {
        console.log("Test: Products page");

        await expect(page.locator('.title')).toHaveText('Products');
        await expect(page.locator('.inventory_list')).toBeVisible();

        let productCount = await page.locator('.inventory_item').count();
        console.log("Products found:", productCount);
        await expect(
            page.locator('.inventory_item')
        ).toHaveCount(6);

        console.log("Products page test passed!");
    });

    test('Add product to cart', async ({ page }) => {
        console.log("Test: Add to cart");

        await page.locator(
            'button[data-test="add-to-cart-sauce-labs-backpack"]'
        ).click();

        await expect(
            page.locator('.shopping_cart_badge')
        ).toHaveText('1');

        await expect(
            page.locator('.shopping_cart_badge')
        ).toBeVisible();

        console.log("Add to cart test passed!");
    });

    test('Sort products', async ({ page }) => {
        console.log("Test: Sort products");

        await page.locator(
            '[data-test="product-sort-container"]'
        ).selectOption('za');

        let firstProduct = await page.locator(
            '.inventory_item_name'
        ).first().textContent();
        console.log("First product after Z-A sort:", firstProduct);

        await expect(
            page.locator('.inventory_item_name').first()
        ).toHaveText('Test.allTheThings() T-Shirt (Red)');

        console.log("Sort test passed!");
    });
});

test.describe('Assertion Examples', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
    });

    test('All assertion types', async ({ page }) => {
        console.log("Test: All assertions");

        await expect(page).toHaveURL('https://www.saucedemo.com/');
        console.log("URL assertion passed!");

        await expect(page).toHaveTitle('Swag Labs');
        console.log("Title assertion passed!");

        await expect(
            page.locator('#user-name')
        ).toBeVisible();
        console.log("Visible assertion passed!");

        await expect(
            page.locator('#login-button')
        ).toBeEnabled();
        console.log("Enabled assertion passed!");

        await expect(
            page.locator('#user-name')
        ).not.toHaveValue('something');
        console.log("NOT assertion passed!");

        console.log("All assertions passed!");
    });

    test('Soft assertions', async ({ page }) => {
        console.log("Test: Soft assertions");

        await expect.soft(page).toHaveURL(
            'https://www.saucedemo.com/'
        );
        await expect.soft(
            page.locator('#user-name')
        ).toBeVisible();
        await expect.soft(
            page.locator('#login-button')
        ).toBeEnabled();

        console.log("Soft assertions done!");
    });
});