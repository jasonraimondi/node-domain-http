import { CommandBus } from './lib/bus/command-bus';
import { Mapper } from './lib/bus/mapper';
import { CouchRepositoryConnection } from './lib/couch-repository-connection';
import { IAction } from './lib/interfaces';
import { InversifyContainer } from './lib/inversify.container';
import { LoggerService } from './services/logger.service';
import { RepositoryFactory } from './repository/repository-factory';
import { ServiceFactory } from './services/service.factory';

export class ApplicationCore {
  private _couchDbConnection?: CouchRepositoryConnection;
  private _commandBus?: CommandBus;
  private _mapper?: Mapper;
  private _repositoryFactory?: RepositoryFactory;
  private _serviceFactory?: ServiceFactory;
  private _inversifyContainer?: InversifyContainer;

  constructor(private readonly logger: LoggerService) {
  }

  public async dispatchCommand<T = any>(command: IAction): Promise<T> {
    return await this.commandBus.execute(command);
  }

  private get commandBus() {
    if (!this._commandBus) {
      this._commandBus = new CommandBus(this.mapper);
    }
    return this._commandBus;
  }

  private get couchRepositoryConnection() {
    if (!this._couchDbConnection) {
      this._couchDbConnection = new CouchRepositoryConnection();
    }
    return this._couchDbConnection;
  }

  private get mapper() {
    if (!this._mapper) {
      this._mapper = new Mapper(this.inversifyContainer, this.logger);
    }
    return this._mapper;
  }

  private get inversifyContainer() {
    if (!this._inversifyContainer) {
      this._inversifyContainer = new InversifyContainer(this.repositoryFactory, this.serviceFactory);
    }
    return this._inversifyContainer;
  }

  public get serviceFactory(): ServiceFactory {
    if (!this._serviceFactory) {
      this._serviceFactory = new ServiceFactory(this.repositoryFactory, this.logger);
    }
    return this._serviceFactory;
  }

  public get repositoryFactory() {
    if (!this._repositoryFactory) {
      this._repositoryFactory = new RepositoryFactory(this.couchRepositoryConnection, this.logger);
    }
    return this._repositoryFactory;
  }
}
