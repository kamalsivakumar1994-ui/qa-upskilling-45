function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function goToPage(url: string): Promise<void> {
    console.log(`Going to ${url}...`);
    await wait(1000);

    if (url.includes("broken")) {
        throw new Error(`Page not found: ${url}`);
    }

    console.log("Page loaded successfully!");
}

async function runTest(url: string): Promise<void> {
    try {
        await goToPage(url);
        console.log("TEST PASSED!");
    } catch (error) {
        if (error instanceof Error) {
            console.log("TEST FAILED:", error.message);
        }
    } finally {
        console.log("Browser closed!");
        console.log("─────────────────────");
    }
}

async function main() {
    await runTest("https://saucedemo.com");
    await runTest("https://broken-website.com");
    await runTest("https://playwright.dev");
}

main();