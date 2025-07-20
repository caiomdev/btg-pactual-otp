import { LoggerInterface } from "#application/contracts/logger_interface";
import logger from "@adonisjs/core/services/logger";

export class AdonisLogger implements LoggerInterface {
  info(message: string): void {
    logger.info(message)
  }

  error(message: string): void {
    logger.error(message)
  }
}