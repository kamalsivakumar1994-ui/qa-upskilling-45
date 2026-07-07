import { test, expect } from '@playwright/test';

test('Testing Hover',async ({page})=>
{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice");
    console.log("=== Test 1: Hover ===");
    console.log("Hovering over button...");
    await page.getByRole('button',{name: 'Hover menu trigger'}).first().hover();
    console.log("Checking submenu appeared...");
    await expect (page.locator('[data-testid="submenu-item-2"]')).toBeVisible();

    let HoverOptionText =  await page.locator('[data-testid="submenu-item-2"]').textContent();
    console.log("Option selected is:",HoverOptionText);
    
})


test('Double click Test', async ({page})=>
    {
await page.goto("https://www.sreenidhirajakrishnan.com/practice");
await page.getByRole('button',{name: 'Double click button'}).dblclick();
let doubleclickMessage = await page.locator('[data-testid="double-click-result"]').textContent();
console.log("is it double clicked:", doubleclickMessage);
})

test('Right click action', async ({ page }) => 
    {
        await page.goto("https://www.sreenidhirajakrishnan.com/practice");
        console.log("=== Test 3: Right Click ===");
        console.log("Right clicking on box...");
        await page.getByRole('button', {name: 'Right click button'}).click({button:'right'});
        let clickeddone = await page.locator('[data-testid="right-click-result"]').textContent();
        console.log('Left or right click:',clickeddone);
        console.log("Right click test passed!");       

    })

    test('Keyboard action', async ({ page }) => 
    {
        await page.goto("https://www.sreenidhirajakrishnan.com/practice");
        console.log("=== Test 4: Keyboard actions ===");
         await page.getByRole('textbox', {name: 'Keyboard input'});
          console.log("Pressing Enter ...");
        await page.keyboard.press('Enter');
        console.log("Entered keyboard only!");
        })

     test('Keyboard action 1', async ({ page }) => {

    await page.goto("https://www.sreenidhirajakrishnan.com/practice");
    console.log("=== Test 4: Keyboard actions ===");

    console.log("Clicking textbox to focus it...");
    await page.getByRole('textbox', { name: 'Keyboard input' }).click();

    console.log("Typing text...");
    await page.getByRole('textbox', { name: 'Keyboard input' }).fill('Kamal');

    console.log("Pressing Enter...");
    await page.keyboard.press('Enter');

    console.log("Pressing Tab...");
    await page.keyboard.press('Tab');

    console.log("Pressing Escape...");
    await page.keyboard.press('Escape');

    let keyboardResult = await page.locator('[data-testid="keyboard-result"]').textContent();
    console.log("Result:", keyboardResult);

    console.log("Keyboard test passed!");
});

test('Keyboard arrow counter', async ({ page }) => {

    await page.goto("https://www.sreenidhirajakrishnan.com/practice");
    console.log("=== Test 5: Keyboard actions-Counter check ===");

    console.log("Clicking textbox to focus it...");
    await page.getByRole('textbox', { name: 'Keyboard input' }).click();

    console.log("Pressing the Arrow up 3 times");
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowUp');

    let LastKey = await page.locator('[data-testid="keyboard-result"]').textContent();
    let ArrowCounter = await page.locator('[data-testid="arrow-counter"]').textContent();

    console.log("Last key used", LastKey);
    console.log("Last Arrow count", ArrowCounter);
   

    console.log("Now pressing Arrow Down 1 time...");
    await page.keyboard.press('ArrowDown');

    let lastKeyAfter = await page.locator('[data-testid="keyboard-result"]').textContent();
    let arrowCounterAfter = await page.locator('[data-testid="arrow-counter"]').textContent();

    console.log("Last key used:", lastKeyAfter);
    console.log("Arrow counter after down:", arrowCounterAfter);

    console.log("Arrow counter test passed!");
});

test('Drag and drop', async({page}) =>{

    await page.goto("https://www.sreenidhirajakrishnan.com/practice");
    console.log("=== Test 6: Drag and Drop ===");

    let columnA = page.locator('//div[@id="drag-source"]');
    let columnB = page.locator('//div[@id="drop-zone"]');
    await columnA.dragTo(columnB);
    let DragMessage = await page.locator('[data-testid="drop-result"]').textContent();
    console.log("Drop Status",DragMessage)
    console.log("Drag and drop done");
    
})