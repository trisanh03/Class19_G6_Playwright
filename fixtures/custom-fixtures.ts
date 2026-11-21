import { test as base } from "@playwright/test";
import type { Logger } from "winston";
import fs from "fs";
import { createTestLogger } from "../utils/logger";
import { RegisterPage } from "../pages/RegisterPage";
import { LoginPage } from "../pages/LoginPage";
import { CommonDialog } from "../dialogs/CommonDialog";

type MyFixtures = {
  logger: Logger;
  registerPage: RegisterPage;
  loginPage: LoginPage;
  commonDialog: CommonDialog;
};

export const test = base.extend<MyFixtures>({
  logger: async ({ page }, use, testInfo) => {
    const { logger, logFile } = createTestLogger(testInfo);

    try {
      logger.info(`TEST STARTED: ${testInfo.title}`);
      logger.info(
        `Test ID: ${testInfo.testId} | Worker: ${testInfo.workerIndex}`,
      );

      await use(logger);
    } finally {
      const failed =
        testInfo.status === "failed" || testInfo.status === "timedOut";

      logger.info(`TEST STATUS: ${testInfo.status}`);
      logger.info(`Test duration: ${testInfo.duration} ms`);

      for (const error of testInfo.errors) {
        logger.error(error.stack || error.message);
      }

      
      if (failed && !page.isClosed()) {
        try {
          const screenshot = await page.screenshot({
            fullPage: true,
          });

          await testInfo.attach("Failure Screenshot", {
            body: screenshot,
            contentType: "image/png",
          });

          logger.info("Failure screenshot attached to Allure");
        } catch (error) {
          logger.error(
            `Failed to capture screenshot: ${
              error instanceof Error ? error.message : String(error)
            }`,
          );
        }
      }

      logger.info("TEST FINISHED");

     
      await new Promise<void>((resolve, reject) => {
        logger.once("finish", resolve);
        logger.once("error", reject);
        logger.end();
      });

      if (fs.existsSync(logFile)) {
        await testInfo.attach("Winston Log", {
          path: logFile,
          contentType: "text/plain",
        });
      }
    }
  },

  registerPage: async ({ page, logger }, use) => {
    await use(new RegisterPage(page, logger));
  },

  loginPage: async ({ page, logger }, use) => {
    await use(new LoginPage(page, logger));
  },

  commonDialog: async ({ page, logger }, use) => {
    await use(new CommonDialog(page, logger));
  },
});

export { expect } from "@playwright/test";
