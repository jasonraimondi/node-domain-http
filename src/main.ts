import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as nunjucks from 'nunjucks';
import { join } from 'path';

import { ValidationPipe } from '@nestjs/common';
import { ApplicationModule } from './http/app.module';
import { HttpLoggerService } from './http/services/http-logger.service';

async function bootstrap() {
  const templatePath = join(__dirname, './templates');
  const assetsPath = join(__dirname, '../assets');

  const app = await NestFactory.create(ApplicationModule, {
    logger: false,
  });
  app.useLogger(app.get(HttpLoggerService));
  app.useGlobalPipes(new ValidationPipe());

  nunjucks.configure(templatePath, {
    autoescape: true,
    express: app,
  });

  app.use(express.static(assetsPath));

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.use(helmet());

  await app.listen(3000);
}

bootstrap()
  .then()
  .catch((err) => console.log(err));
