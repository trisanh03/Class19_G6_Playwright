import { Locator, Page } from "@playwright/test";
import { CommonPage } from "./CommonPage";
import type { Logger } from "winston";

export class RegisterPage extends CommonPage {
  urlPath: string = "/sign-up";

  readonly accountInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page, logger: Logger) {
    super(page, logger);
    this.accountInput = page.locator("#taiKhoan");
    this.passwordInput = page.locator("#matKhau");
    this.confirmPasswordInput = page.locator("#confirmPassWord");
    this.fullNameInput = page.locator("#hooTen");
    this.emailInput = page.locator("#email");
    this.registerButton = page.locator('//button[span[text()="Đăng ký"]]');
  }

  async enterAccount(account: string) {
    this.logger.info("Enter account");
    await this.accountInput.fill(account);
  }

  async enterPassword(password: string) {
    this.logger.info("Enter password");
    await this.passwordInput.fill(password);
  }

  async confirmPassword(password: string) {
    this.logger.info("Enter confirmPassword");
    await this.confirmPasswordInput.fill(password);
  }

  async enterFullName(fullname: string) {
    this.logger.info("Enter username");
    await this.fullNameInput.fill(fullname);
  }

  async enterEmail(email: string) {
    this.logger.info("Enter email");
    await this.emailInput.fill(email);
  }

  async clickRegister() {
    this.logger.info("Click Register button");
    await this.registerButton.click();
  }
}