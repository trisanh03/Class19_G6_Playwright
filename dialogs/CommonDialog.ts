import { Locator, Page } from "@playwright/test";
import type { Logger } from "winston";

export class CommonDialog {
  readonly dialogMessage: Locator;

  constructor(
    page: Page,
    private readonly logger: Logger,
  ) {
    this.dialogMessage = page.locator("#swal2-title");
  }

  async getDialogMessage(): Promise<string> {
    this.logger.info("Get dialog message");

    const message = await this.dialogMessage.innerText();

    this.logger.info(`Dialog message: ${message}`);

    return message;
  }
}
