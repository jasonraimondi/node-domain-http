import { LoggerService } from './logger.service';
import { RepositoryFactory } from '../repository/repository-factory';
import { AxiosRestClient } from '../rest/axios.rest-client';
import { UnsplashService } from './unsplash/unsplash.service';

export class ServiceFactory {
  constructor(
    private readonly repositoryFactory: RepositoryFactory,
    private readonly logger: LoggerService,
  ) {
  }

  public get unsplashService() {
    return new UnsplashService(this.restClient, this.logger);
  }

  private get restClient() {
    return new AxiosRestClient(this.logger);
  }
}
