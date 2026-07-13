import { Page } from '@playwright/test';

export async function takeScreenshot(
    page: Page,
    name: string
): Promise<void> {
    await page.screenshot({
        path: `test-results/screenshots/${name}.png`,
        fullPage: true
    });
    console.log(`Screenshot saved: ${name}.png`);
}

export function getTimestamp(): string {
    return new Date().toISOString().replace(/[:.]/g, '-');
}