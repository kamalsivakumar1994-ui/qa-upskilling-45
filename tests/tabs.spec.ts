import { test, expect } from '@playwright/test';

test('Handle new tab opening', async ({ page, context }) => {

    await page.goto('https://the-internet.herokuapp.com/windows');
 console.log("=== Test 1: Open new tab ===");
 console.log("Current URL", page.url());
 console.log("Total tabs before click:",context.pages().length);
 
 
 const [newPage]= await Promise.all([context.waitForEvent('page'),page.getByRole('link',{name: 'Click Here'}).click()]);

 await newPage.waitForLoadState();
 console.log("New Tab URL:",newPage.url());
 console.log("Total tabs after the click:",context.pages().length);
 await expect(newPage).toHaveURL('https://the-internet.herokuapp.com/windows/new');

let newPageTitle = await newPage.getByRole('heading', { name: 'New Window' }).textContent();
console.log("The New Page Title is:", newPageTitle);

await newPage.close();
console.log("current Url:",page.url());
console.log("The Total tabs after closing:",context.pages().length);
});

test('switch betwee multiple tabs', async({page,context})=>{
await page.goto('https://www.sreenidhirajakrishnan.com/practice');
console.log("====Test 2: Switch between tabs====");
console.log("Current tab Url:", page.url());
console.log("Total tabs before switching:",context.pages().length);

const [switchPage]=await Promise.all([context.waitForEvent('page'), page.locator('//button[@id="open-window-btn"]').click()])
await switchPage.waitForLoadState();

console.log("Tab 1 url:",page.url());
console.log("Tab 2 url:", switchPage.url());

console.log("Working on Tab 2...");
await expect(switchPage).toHaveURL('about:blank');
console.log("Tab 2 verified!");
console.log("Switching back to Tab 1...");
await page.bringToFront();
await expect(page.locator('//p[@data-testid="window-result"]')).toHaveText('New window/tab opened');

let message = await page.locator('//p[@data-testid="window-result"]').textContent();
console.log("Tab 1 message:", message);

console.log("Tab 1 content verified!");
    await switchPage.close();
    console.log("Tab 2 closed!");
    console.log("Test passed!");
});
 