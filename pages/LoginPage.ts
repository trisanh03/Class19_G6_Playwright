import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";
import { Logger } from "winston";
export class LoginPage extends CommonPage {
    urlPath: string = '/sign-in';
    
    readonly accountInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

      constructor(page: Page, logger: Logger) {
        super(page, logger);
        this.accountInput = page.locator('#taiKhoan');
        this.passwordInput = page.locator('#matKhau');
        this.loginButton = page.locator('//button[span[text()="Đăng nhập"]]');      
    }

    async enterAccount(account: string) {
        await this.accountInput.fill(account);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }
}