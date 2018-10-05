import * as winston from 'winston';
import { Logger } from 'winston';

export class LoggerService {
  public static get winstonLogger(): Logger {
    const winstonLogger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: '/tmp/combined.log' }),
        new winston.transports.File({
          filename: '/tmp/error.log',
          level: 'error',
        }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      winstonLogger.add(
        new winston.transports.Console({
          format: winston.format.simple(),
        }),
      );
      winstonLogger.level = 'debug';
    }

    return winstonLogger;
  }

  public static createFromWinstonLogger() {
    return new LoggerService(LoggerService.winstonLogger);
  }

  constructor(private readonly logger: Logger) {}

  /**
   * @deprecated
   * @param message
   */
  public log(message: any) {
    return this.info(this.stringify(message));
  }

  public debug(message: any) {
    return this.logger.debug(this.stringify(message));
  }

  public info(message: any) {
    return this.logger.info(this.stringify(message));
  }

  public warn(message: any) {
    return this.logger.warn(this.stringify(message));
  }

  public error(message: any, trace?: string) {
    return this.logger.error(this.stringify(message), trace);
  }

  private stringify(message: any) {
    if (typeof message === 'string') {
      return message;
    }

    try {
      return JSON.stringify(message);
    } catch (e) {
      return message.toString();
    }
  }
}
