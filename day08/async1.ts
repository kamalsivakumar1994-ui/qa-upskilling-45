function wait(seconds: number): Promise<void> {
    return new Promise(resolve => 
        setTimeout(resolve, seconds * 1000)
    );
}

async function runLoginTest() {
    console.log("Test started...");

    console.log("Step 1: Opening browser...");
    await wait(1);
    console.log("Browser opened!");

    console.log("Step 2: Going to login page...");
    await wait(1);
    console.log("Login page loaded!");

    console.log("Step 3: Typing username...");
    await wait(1);
    console.log("Username typed!");

    console.log("Step 4: Clicking login...");
    await wait(1);
    console.log("Login clicked!");

    console.log("Step 5: Checking result...");
    await wait(1);
    console.log("Login successful!");

    console.log("Test finished!");
}

runLoginTest();