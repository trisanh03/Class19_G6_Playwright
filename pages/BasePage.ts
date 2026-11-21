import { Page } from "@playwright/test";
import type { Logger } from "winston";

export abstract class BasePage {
  abstract urlPath: string;

  constructor(
    readonly page: Page,
    protected logger: Logger,
  ) {}

  async open(url: string = this.urlPath) {
    this.logger.info(`Opening URL: ${url}`);

    await this.page.goto(url);

    this.logger.info(`Navigation completed: ${url}`);
  }
}
