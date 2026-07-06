import { test, expect } from '@playwright/test';

test('Form interactions on testsite', async ({ page }) => {
    await page.goto("https://www.sreenidhirajakrishnan.com/practice");

    console.log("=== Fill interaction");
    await expect(page.getByRole('textbox', { name: 'Text input' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Text input' }).fill('Kamal');
    let UserName = await page.getByRole('textbox', { name: 'Text input' }).inputValue();
    console.log("UserName :", UserName);

    await expect(page.getByRole('textbox', { name: 'Password input' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Password input' }).fill('Test123');
    let PasswordGiven = await page.getByRole('textbox', { name: 'Password input' }).inputValue();
    console.log("Password Entered :", PasswordGiven);

    await page.locator("//input[@id='phone-input']").fill('+32-46510123');
    let MobileNumber = await page.locator("//input[@id='phone-input']").inputValue();
    console.log("Mobile Number", MobileNumber);

    await page.locator("//textarea[@class='input-field practice-input w-full']").pressSequentially('I am a Tester');

    await page.getByRole('combobox', { name: 'Standard select' }).selectOption({ value: 'red' });
    console.log("Dropdown selected: red");
});