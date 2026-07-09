import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordnameField: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;
    readonly LogMessage:Locator;

constructor(page: Page) {

this.page= page;
this.usernameField=page.locator('#auth-username');
this.passwordnameField=page.getByRole('textbox',{name: 'Auth password'});
this.submitButton=page.getByRole('button',{name: 'Login'})
this.errorMessage= page.getByText('Invalid credentials',{exact: true});
this.LogMessage= page.getByText('Dashboard — login successful',{exact: true});
}

async navigate(): Promise <void>{
    await this.page.goto('https://www.sreenidhirajakrishnan.com/practice');
}

async fillUserName(username: string): Promise <void>{
    await this.usernameField.fill(username);
    }

 async fillPassword(password: string): Promise<void> {
        await this.passwordnameField.fill(password);
    }

async clickSubmitBtn():Promise<void>{
        await this.submitButton.click();
    }

async LoginPage1(username: string,password: string): Promise<void>{
     await this.fillUserName(username);
     await this.fillPassword(password);
     await this.clickSubmitBtn();
    }

async errorMessagecheck():Promise<string>{
    return await this.errorMessage.textContent() || '';

}

async isErrorVisible():Promise<boolean>{
    return await this.errorMessage.isVisible();
}

async LoggedinMessageCheck():Promise<string>{
   let MessageDisplayed =  await this.LogMessage.textContent() || '';
    console.log("LoggedIn?",MessageDisplayed);
    return MessageDisplayed;
}

async ErrorLoggedinMessageCheck():Promise<string>{
   let MessageDisplayed =  await this.errorMessage.textContent() || '';
    console.log("LoggedIn?",MessageDisplayed);
    return MessageDisplayed;
}

}



