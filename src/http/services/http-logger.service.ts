import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

import { LoggerService } from '../../domain/infrastructure/services/logger.service';

@Injectable()
export class HttpLoggerService extends LoggerService implements NestLoggerService {
  public static createFromWinstonLogger() {
    return new HttpLoggerService(HttpLoggerService.winstonLogger);
  }
}
