import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('Take screenshots', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');
    console.log("=== Test 1: Screenshots ===");

    console.log("Taking full page screenshot...");
    await page.screenshot({
        path: 'test-results/screenshots/login-page.png',
        fullPage: true
    });
    console.log("Full page screenshot saved!");

    console.log("Filling login form...");
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');

    console.log("Taking screenshot before login...");
    await page.screenshot({
        path: 'test-results/screenshots/before-login.png'
    });
    console.log("Before login screenshot saved!");

    await page.locator('#login-button').click();
    await page.waitForURL('https://www.saucedemo.com/inventory.html');

    console.log("Taking screenshot after login...");
    await page.screenshot({
        path: 'test-results/screenshots/after-login.png'
    });
    console.log("After login screenshot saved!");

    console.log("Taking element screenshot...");
    await page.locator('.inventory_list').screenshot({
        path: 'test-results/screenshots/product-list.png'
    });
    console.log("Element screenshot saved!");

    console.log("Screenshots test passed!");
});

test('Network mocking - mock API response', async ({ page }) => {

    console.log("=== Test 2: Network Mocking ===");

    console.log("Setting up route mock...");
    await page.route('**/*.png', route => {
        console.log("Blocking image:", route.request().url());
        route.abort();
    });

    await page.goto('https://www.saucedemo.com');
    console.log("Page loaded with images blocked!");

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.waitForURL('https://www.saucedemo.com/inventory.html');

    console.log("Taking screenshot with blocked images...");
    await page.screenshot({
        path: 'test-results/screenshots/no-images.png',
        fullPage: true
    });
    console.log("Screenshot saved - images should be missing!");

    await expect(page.locator('.inventory_list')).toBeVisible();
    console.log("Page still works with images blocked!");

    console.log("Network mock test passed!");
});

test('Network mocking - intercept and log requests', async ({ page }) => {

    console.log("=== Test 3: Intercept Requests ===");

    let requestCount = 0;
    let requestUrls: string[] = [];

    page.on('request', request => {
        requestCount++;
        requestUrls.push(request.url());
    });

    await page.goto('https://www.saucedemo.com');

    console.log("Total requests made:", requestCount);
    console.log("First 3 requests:");
    requestUrls.slice(0, 3).forEach((url, index) => {
        console.log(`  ${index + 1}. ${url}`);
    });

    console.log("Request interception test passed!");
});

test('Screenshot on failure example', async ({ page }) => {

    console.log("=== Test 4: Screenshot handling ===");

    await page.goto('https://www.saucedemo.com');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.waitForURL('https://www.saucedemo.com/inventory.html');

    try {
        await expect(
            page.locator('.non-existent-element')
        ).toBeVisible({ timeout: 3000 });
    } catch (error) {
        console.log("Element not found - taking failure screenshot...");
        await page.screenshot({
            path: 'test-results/screenshots/failure-screenshot.png'
        });
        console.log("Failure screenshot saved!");
    }

    console.log("Test completed!");
});