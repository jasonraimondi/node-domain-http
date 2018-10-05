import { Injectable } from '@nestjs/common';

import { ApplicationCore } from '../../domain/infrastructure/application.core';
import { HttpLoggerService } from './http-logger.service';

@Injectable()
export class DomainService extends ApplicationCore {
  constructor(logger: HttpLoggerService) {
    super(logger);
  }
}
