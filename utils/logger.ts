import winston from "winston";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";
import type { TestInfo } from "@playwright/test";

export function createTestLogger(testInfo: TestInfo) {
  const logDir = path.resolve(process.cwd(), "logs");

  fs.mkdirSync(logDir, { recursive: true });

  const safeName = [
    testInfo.title.replace(/[^a-zA-Z0-9-_]/g, "_").slice(0, 40),

    `w${testInfo.workerIndex}`,
    `r${testInfo.retry}`,
    randomUUID().slice(0, 6),
  ].join("-");

  const logFile = path.join(logDir, `${safeName}.log`);

  const logger = winston.createLogger({
    level: "info",

    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      winston.format.errors({ stack: true }),
      winston.format.printf(({ timestamp, level, message, stack }) => {
        return `[${timestamp}] [${level.toUpperCase()}] ${stack || message}`;
      }),
    ),

    transports: [
      new winston.transports.File({
        filename: logFile,
      }),
    ],
  });

  return { logger, logFile };
}
