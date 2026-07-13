import { Page, Locator } from '@playwright/test';
import { config } from '../config/config.js';

export class LoginPage {

    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;
    readonly logMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('#auth-username');
        this.passwordField = page.getByRole('textbox', { name: 'Auth password' });
        this.submitButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByText('Invalid credentials', { exact: true });
        this.logMessage = page.getByText('Dashboard — login successful', { exact: true });
    }

    async navigate(): Promise<void> {
        await this.page.goto(config.baseUrl);
    }

    async fillUserName(username: string): Promise<void> {
        await this.usernameField.fill(username);
    }

    async fillPassword(password: string): Promise<void> {
        await this.passwordField.fill(password);
    }

    async clickSubmitBtn(): Promise<void> {
        await this.submitButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.fillUserName(username);
        await this.fillPassword(password);
        await this.clickSubmitBtn();
    }

    async getSuccessMessage(): Promise<string> {
        let message = await this.logMessage.textContent() || '';
        console.log("Success message:", message);
        return message;
    }

    async getErrorMessage(): Promise<string> {
        let message = await this.errorMessage.textContent() || '';
        console.log("Error message:", message);
        return message;
    }

    async isErrorVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    async isSuccessVisible(): Promise<boolean> {
        return await this.logMessage.isVisible();
    }
}