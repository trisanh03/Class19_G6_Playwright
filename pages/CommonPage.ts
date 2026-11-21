import { Page } from "@playwright/test";
import type { Logger } from "winston";

import { TopNavigationBar } from "../components/TopNavigationBar";
import { BasePage } from "./BasePage";

export abstract class CommonPage extends BasePage {
  readonly topNavigationBar: TopNavigationBar;

  constructor(page: Page, logger: Logger) {
    super(page, logger);

    this.topNavigationBar = new TopNavigationBar(page);
  }
}
