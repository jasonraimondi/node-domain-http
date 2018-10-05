import { Module, Provider } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './controllers/app.controller';
import { RegisterController } from './controllers/register.controller';
import { HttpExceptionFilter } from './exceptions/filters/http-exception.filter';
import { DomainService } from './services/domain.service';
import { HttpLoggerService } from './services/http-logger.service';

const logger: Provider = {
  provide: HttpLoggerService,
  useFactory: () => HttpLoggerService.createFromWinstonLogger(),
};

@Module({
  controllers: [
    AppController,
    RegisterController,
  ],
  providers: [
    logger,
    DomainService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [HttpLoggerService],
})
export class ApplicationModule {
}
