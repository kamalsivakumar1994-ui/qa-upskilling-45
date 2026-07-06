import { test, expect } from '@playwright/test';

/*test('Handle alerts', async ({ page }) => {

    await page.goto("https://www.sreenidhirajakrishnan.com/practice");
    console.log("Handling Show Alert");
    page.on('dialog', dialog =>dialog.accept());
    await page.locator('//button[@id="alert-btn"]').click();
    
})

test('Handling Alerts with Cofirm and cancel', async ({page})=>{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice");
    page.on('dialog', dialog => dialog.accept());
    page.localStorage('//p[@data-testid="alert-result" and contains(text(), "Alert was shown and dismissed")]')

})*/
test('Handle  alerts', async ({ page }) => {

    await page.goto("https://www.sreenidhirajakrishnan.com/practice");

    console.log("=== Test 1: Simple Alert ===");
    page.on('dialog', async dialog => {
        console.log("Alert type:", dialog.type());
        console.log("Alert message:", dialog.message());
        await dialog.accept();
    });

    await page.locator('//button[@id="alert-btn"]').click();

    await expect(
        page.locator('//p[@data-testid="alert-result" and contains(text(), "Alert was shown and dismissed")]')
    ).toBeVisible();

    console.log("Alert handled!");
});

test('Handle Confirm Alerts', async({page}) =>{

     await page.goto("https://www.sreenidhirajakrishnan.com/practice");
     console.log("=== Test 2: Confirm Alert ===");

     //page.on('dialog',dialog =>dialog.accept());
     page.on('dialog', async dialog => {
        console.log("Alert type:", dialog.type());
        console.log("Alert message:", dialog.message());
        await dialog.accept();
     })
     await page.locator('//button[@id="confirm-btn"]').click();
     await expect(
        page.locator('//p[@data-testid="alert-result" and contains(text(), "Confirm result: OK")]')).toBeVisible();
    console.log("Confirm result: OK!");
})

test('Handle Confirm Alert - Cancel', async ({ page }) => {

    await page.goto("https://www.sreenidhirajakrishnan.com/practice");
    console.log("=== Test 2b: Confirm Alert - Cancel ===");

    page.on('dialog', async dialog => {
        console.log("Alert type:", dialog.type());
        console.log("Alert message:", dialog.message());
        await dialog.dismiss();
    });

    await page.locator('//button[@id="confirm-btn"]').click();

    await expect(
        page.locator('//p[@data-testid="alert-result" and contains(text(), "Confirm result: Cancel")]')
    ).toBeVisible();

    console.log("Confirm Cancel handled!");
});
test('Handle Prompt dialog box', async({page})=>{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice");
     console.log("=== Test 3: Prompt Alert ===");
     page.on('dialog', async dialog  =>{
        console.log('Alert Type', dialog.type());
        console.log('Alert Message',dialog.message());   
        await dialog.accept('Test');         
     })
     page.getByRole('button',{name:'Show prompt'}).click();
     await expect(
        page.locator('//p[@data-testid="alert-result"]')).toHaveText('Prompt value: Test');
    console.log("Text Added");

 });

 test('Handle iFrames', async({page})=>{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice");
     console.log("=== Test 3: Iframes ===");

 let frame=page.frameLocator('//iframe[@title="practice-iframe"]')
 await frame.getByRole('textbox',{name:'Inside iframe'}).fill('tests');
 await frame.getByRole('button',{name:'Submit'}).click();
 console.log("Checking result inside iFrame...");
 //await expect(frame.locator('[data-testid="iframe-result"]')).toBeVisible();
console.log("iFrame test passed!");
});