function wait(ms: number): Promise<void> {
    return new Promise(resolve => 
        setTimeout(resolve, ms)
    );
}

class FakeBrowser {

    async goto(url: string): Promise<void> {
        console.log(`Going to ${url}...`);
        await wait(1000);
        console.log(`Page loaded!`);
    }

    async fill(field: string, value: string): Promise<void> {
        console.log(`Typing "${value}" in ${field}...`);
        await wait(500);
        console.log(`${field} filled!`);
    }

    async click(button: string): Promise<void> {
        console.log(`Clicking ${button}...`);
        await wait(500);
        console.log(`${button} clicked!`);
    }

    async getText(element: string): Promise<string> {
        console.log(`Reading text from ${element}...`);
        await wait(500);
        return "Welcome Kamal!";
    }
}

async function loginTest() {
    console.log("=== LOGIN TEST STARTED ===");

    let browser = new FakeBrowser();

    await browser.goto("https://saucedemo.com");
    await browser.fill("username field", "Kamal");
    await browser.fill("password field", "Test@123");
    await browser.click("Login button");

    let welcomeText = await browser.getText("welcome message");
    console.log("Page says:", welcomeText);

    console.log("=== LOGIN TEST PASSED ===");
}

loginTest();