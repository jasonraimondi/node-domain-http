import { interfaces } from 'inversify';

import { InversifyContainer } from '../../src/domain/infrastructure/lib/inversify.container';
import { RepositoryFactory } from '../../src/domain/infrastructure/repository/repository-factory';
import { ServiceFactory } from '../../src/domain/infrastructure/services/service.factory';

export class TestingInversifyConfig extends InversifyContainer {
  public constructor(
    repositoryFactory: RepositoryFactory,
    serviceFactory: ServiceFactory,
    containerOptions?: interfaces.ContainerOptions,
  ) {
    super(repositoryFactory, serviceFactory, containerOptions);
    this.rebindContainer();
  }

  protected rebindContainer(): void {
  }
}
