function wait(seconds: number): Promise<void> {
    return new Promise(resolve =>
        setTimeout(resolve, seconds * 1000)
    );
}

async function checkLoginStatus(): Promise<boolean> {
    console.log("Checking login status...");
    await wait(2);
    return true;
}

async function getUserName(): Promise<string> {
    console.log("Getting username from page...");
    await wait(1);
    return "Kamal";
}

async function runTest() {
    let isLoggedIn = await checkLoginStatus();
    console.log("Is logged in:", isLoggedIn);

    let userName = await getUserName();
    console.log("Username on page:", userName);

    if (isLoggedIn) {
        console.log("Test PASSED!");
    } else {
        console.log("Test FAILED!");
    }
}

runTest();