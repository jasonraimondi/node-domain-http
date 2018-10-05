import { Container, interfaces } from 'inversify';

import { CouchImageRepository } from '../repository/image/couchImageRepository';
import { RepositoryFactory } from '../repository/repository-factory';
import { CouchUserRepository } from '../repository/user/couch-user-repository';
import { ServiceFactory } from '../services/service.factory';
import { UnsplashService } from '../services/unsplash/unsplash.service';
import { Mapper } from './bus/mapper';

export class InversifyContainer extends Container {
  public constructor(
    protected readonly repositoryFactory: RepositoryFactory,
    protected readonly serviceFactory: ServiceFactory,
    containerOptions?: interfaces.ContainerOptions,
  ) {
    super(containerOptions);
    this.bindContainer();
  }

  protected bindContainer(): void {
    this.bind<UnsplashService>(Mapper.types.UnsplashService).toConstantValue(this.serviceFactory.unsplashService);
    this.bind<CouchImageRepository>(Mapper.types.CouchImageRepository).toConstantValue(this.repositoryFactory.imageRepository);
    this.bind<CouchUserRepository>(Mapper.types.CouchUserRepository).toConstantValue(this.repositoryFactory.userRepository);
  }
}
