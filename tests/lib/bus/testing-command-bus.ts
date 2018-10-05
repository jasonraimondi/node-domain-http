require('dotenv').config();

import { CommandBus } from '../../../src/domain/infrastructure/lib/bus/command-bus';
import { Mapper } from '../../../src/domain/infrastructure/lib/bus/mapper';
import { CouchRepositoryConnection } from '../../../src/domain/infrastructure/lib/couch-repository-connection';
import { LoggerService } from '../../../src/domain/infrastructure/services/logger.service';
import { RepositoryFactory } from '../../../src/domain/infrastructure/repository/repository-factory';
import { ServiceFactory } from '../../../src/domain/infrastructure/services/service.factory';
import { TestingInversifyConfig } from '../testing.inversify.config';

const logger = new LoggerService(LoggerService.winstonLogger);
const repositoryConnection = new CouchRepositoryConnection();
const repositoryFactory = new RepositoryFactory(repositoryConnection, logger);
const serviceFactory = new ServiceFactory(logger);
const testingInversifyConfig = new TestingInversifyConfig(repositoryFactory, serviceFactory);
const mapper = new Mapper(testingInversifyConfig, logger);
const testingCommandBus = new CommandBus(mapper);

export {
  testingCommandBus,
  repositoryFactory,
  serviceFactory,
};
