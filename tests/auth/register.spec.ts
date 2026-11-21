import { expect, test } from "../../fixtures/custom-fixtures";
import * as allure from "allure-js-commons";
test("Test Register Successfully", async ({
  registerPage,
  loginPage,
  commonDialog,
  logger,
}) => {
   await allure.epic("Authentication");
   await allure.feature("Register");
   await allure.story("Register Successfully");
   await allure.owner("QA Team");
  const account = crypto.randomUUID();
  const email = `${account}@example.com`;
  const password = "123456";
  const fullname = "John John";

  logger.info("========== START REGISTER TEST ==========");
  logger.info(`Account: ${account}`);

  try {
    await test.step("Pre-condition: Navigate to Register page", async () => {
      logger.info("Navigate to Register page");
      await registerPage.open();
    });

    await test.step("Step 1: Enter account textbox", async () => {
      await registerPage.enterAccount(account);
    });

    await test.step("Step 2: Enter password", async () => {
      await registerPage.enterPassword(password);
    });

    await test.step("Step 3: Re-enter password", async () => {
      await registerPage.confirmPassword(password);
    });

    await test.step("Step 4: Enter full name", async () => {
      await registerPage.enterFullName(fullname);
    });

    await test.step("Step 5: Enter email", async () => {
      await registerPage.enterEmail(email);
    });

    await test.step("Step 6: Click register", async () => {
      await registerPage.clickRegister();
    });

    await test.step("Step 7: Verify registration successfully", async () => {
      const successMsg = await commonDialog.getDialogMessage();

      expect(successMsg).toEqual("Đăng ký thành công");

      logger.info("Register verification PASSED");
    });

    await test.step("Step 8: Navigate to Login page", async () => {
      logger.info("Navigate to Login page");
      await loginPage.open();
    });

    await test.step("Step 9: Enter username", async () => {
      await loginPage.enterAccount(account);
    });

    await test.step("Step 10: Enter password", async () => {
      await loginPage.enterPassword(password);
    });

    await test.step("Step 11: Click login", async () => {
      await loginPage.clickLogin();
    });

    await test.step("Step 12: Verify login successfully", async () => {
      const successMsg = await commonDialog.getDialogMessage();

      expect(successMsg).toEqual("Đăng nhập thành công");

      logger.info("Login verification PASSED");
    });

    logger.info("========== TEST RESULT: PASSED ==========");
  } catch (error) {
    logger.error("========== TEST RESULT: FAILED ==========");

    logger.error(
      error instanceof Error ? error.stack || error.message : String(error),
    );

    throw error;
  }
});
