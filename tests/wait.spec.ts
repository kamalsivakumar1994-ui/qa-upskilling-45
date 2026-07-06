import { test, expect } from '@playwright/test';

test('Waits and synchronisation', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    console.log("Step 1: Login");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    console.log("Step 2: Wait for URL to change");
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
    console.log("URL changed to inventory page!");

    console.log("Step 3: Wait for products to be visible");
    await expect(
        page.locator('.inventory_list')
    ).toBeVisible();
    console.log("Products list is visible!");

    console.log("Step 4: Wait for specific product to appear");
    await expect(
        page.getByText('Sauce Labs Backpack')
    ).toBeVisible();
    console.log("Sauce Labs Backpack is visible!");

    console.log("Step 5: Wait for Add to cart button to be enabled");
    let addToCartBtn = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(addToCartBtn).toBeEnabled();
    console.log("Add to cart button is enabled!");

    console.log("Step 6: Click Add to cart");
    await addToCartBtn.click();

    console.log("Step 7: Wait for cart count to appear");
    await expect(
        page.locator('.shopping_cart_badge')
    ).toBeVisible();
    console.log("Cart badge appeared!");

    console.log("Step 8: Check cart count is 1");
    await expect(
        page.locator('.shopping_cart_badge')
    ).toHaveText('1');
    console.log("Cart count is 1!");
});

test('Wait for error message', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    console.log("Login with wrong password");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('wrong_password');
    await page.locator('#login-button').click();

    console.log("Wait for error to appear");
    await expect(
        page.locator('[data-test="error"]')
    ).toBeVisible();

    console.log("Check error message text");
    await expect(
        page.locator('[data-test="error"]')
    ).toContainText('Username and password do not match');

    console.log("Error message appeared correctly!");
});