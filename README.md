# Command/Query Bus with IoC Container

Actions can either be a `Command` or `Query`. ActionHandlers can either be a `CommandHandler` or a `QueryHandler`.

[Inversify](http://inversify.io/) for inversion of control.

## Getting Started

The first thing you are going to need to do is copy the enviornment file and run `npm install`.

```
cp .env.sample .env
npm install
```

If you want to use the Unsplash stuff, you'll need to add those keys.

You can easily run this using docker compose with `docker-compose up -d`. This will boot BOTH the node server and the couch database.

If you prefer to run the node project locally, the firs tthing you need to do is update the following value in your `.env`
```
COUCHDB_HOST=127.0.0.1
```

Next, you can either comment out the `web:` service in the [docker-compose.yml](./docker-compose.yml) or run `docker-compose up -d db` to get just the db started.

## Docs

### Application Core

[ApplicationCore](src/domain/infrastructure/application.core.ts) is our gateway into our bus. With the ApplicationCore, we can dispatch our Actions.

```typescript
const logger = LoggerService.createFromWinstonLogger();
const applicationCore = new ApplicationCore(logger);

applicationCore.displatchCommand(
  new CreateUser({
    email: body.email,
    passwordString: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
  })
).then(response => console.log(response));
```

### Actions

Actions can be either Commands or Queries. Commands change state, queries retrieve data.

Actions need to register their respective handlers with the `@Action(ActionHandler)` decorator. This registers the Action/ActionHandler pair so when a new action is dispatched we know which handler to execute.

```typescript
export interface IListUsers extends IPagination {
}

@Action(ListUsersHandler)
export class ListUsers extends BaseQuery implements IListUsers  {
  public readonly page: number;
  public readonly itemsPerPage: number;

  public constructor(init: IListUsers) {
    super();
    Object.assign(this, init);
  }
}

```

### ActionHandlers

ActionHandlers follow the same Command/Query pattern.

ActionHandlers need to add the `@ActionHandler()` decorator. This adds the Reflection data to allow us to resolve the class dependencies in our [mapper.ts](src/domain/infrastructure/lib/bus/mapper.ts).

```typescript
@ActionHandler()
export class ListUsersHandler implements IQueryHandler<ListUsers> {
  public constructor(
    private readonly userRepository: CouchUserRepository,
  ) {
  }

  public async execute(command: ListUsers): Promise<any> {
    return await this.userRepository.list();
  }
}
```

### Mapper

The mapper is basically where our dependency injection happens. [This Dependency Injection in TypeScript](https://nehalist.io/dependency-injection-in-typescript/) article is a great resource and is the basis of our `@ActionHandlers()` decorator.

```typescript
export class Mapper {
  ...
  public getCommandHandlerFromCommand(command: IAction | any): IActionHandler | any {
    const handler = this.resolve(command);
    if (!handler) {
      throw new Error('I should throw a HandlerNotFoundException');
    }
    return handler;
  }

  private resolve<T>(target: Type<IAction>): T {
    const commandHandler = Reflect.getMetadata(ACTION_HANDLER_METADATA, target.constructor);

    // tokens are required dependencies, while injections are resolved tokens from the Injector
    const tokens = Reflect.getMetadata('design:paramtypes', commandHandler) || [];
    const injections = tokens.map((token) => {
      const className = token.name;
      if (!Mapper.types.hasOwnProperty(className)) {
        const message = `${className} missing in InversifyContainer.bindContainer`;
        this.logger.error(message);
        throw new Error(message);
      }
      return this.inversifyContainer.get<any>(Mapper.types[className]);
    });
    return new commandHandler(...injections);
  }
```

### Inversify as IoC Container

What makes our container unique is that we are using [Inversify](http://inversify.io/) which gives us a lot more flexability with our container, allowing us to bind/rebind and use factories to construct our dependencies.

This means that we are able to to mock or create dummy depencies for testing.

```typescript
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
    this.bind<CouchImageRepository>(Mapper.types.CouchImageRepository).toConstantValue(this.repositoryFactory.imageRepository);
    this.bind<CouchUserRepository>(Mapper.types.CouchUserRepository).toConstantValue(this.repositoryFactory.userRepository);
    this.bind<UnsplashService>(Mapper.types.UnsplashService).toConstantValue(this.serviceFactory.unsplashService);
  }
}
```

This allows us to extend our TestingInversifyConfig to and rebind our container dependencies.

```typescript
export class TestingInversifyConfig extends InversifyContainer {
  public constructor(
    repositoryFactory: RepositoryFactory,
    serviceFactory: TestingServiceFactory,
    containerOptions?: interfaces.ContainerOptions,
  ) {
    super(repositoryFactory, serviceFactory, containerOptions);
    this.rebindContainer();
  }

  protected rebindContainer(): void {
    this.rebind<TestingUnsplashService>(Mapper.types.UnsplashService).toConstantValue(this.serviceFactory.unsplashService);
  }
}
```

### Http/Nest.js

Our Http layer is exposed using [Nest.js](https://nestjs.com/) which is ultimately express under the hood, although you could use other options, such as [Fastify](https://github.com/fastify/fastify) if you really wanted to.


#### Http/Services/DomainService

This is the main entrypoint into our Domain project in our Http layer. This is going to be injected into our root AppModule and all of our controllers that are interfacing with our domain logic will be depending on this service.

If you notice... it is just extending our ApplicationCore which is [here](src/domain/infrastructure/application.core.ts).

[DomainService](src/http/services/domain.service.ts)

```typescript
import { Injectable } from '@nestjs/common';

import { ApplicationCore } from '../../domain/infrastructure/application.core';
import { HttpLoggerService } from './http-logger.service';

@Injectable()
export class DomainService extends ApplicationCore {
  constructor(logger: HttpLoggerService) {
    super(logger);
  }
}
```

#### Http/Services/HttpLoggerService

This is our Http layer logger. It is just extending our Domain's LoggerService

[HttpLoggerService](src/http/services/http-logger.service.ts)

```typescript
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

import { LoggerService } from '../../domain/infrastructure/services/logger.service';
@Injectable()
export class HttpLoggerService extends LoggerService implements NestLoggerService {
}

```


### Http/Controllers

This is a pretty straightforward Nest.js controller. The special sauce is the DomainService. Notice how we just can dispatch commands from it.

[RegisterController](src/http/controllers/register.controller.ts)

```typescript
@Controller('register')
export class RegisterController {
  constructor(
    private readonly domainService: DomainService,
  ) {
  }

  @Get()
  public async root(@Res() res) {
    return res.render('register.njk');
  }

  @Post()
  public async register(@Res() res, @Body() body: RegisterUserDTO) {
    let response;
    const errors = [];

    try {
      response = await this.domainService.dispatchCommand(
        new CreateUser({
          email: body.email,
          passwordString: body.password,
          firstName: body.firstName,
          lastName: body.lastName,
        }),
      );
    } catch (e) {
      errors.push(e.message);
    }

    if (errors.length > 0) {
      const { password, ...bodyWithoutPassword } = body;
      return res.render('register.njk', {
        errors,
        ...bodyWithoutPassword,
      });
    }

    return res.json(response);
  }
}
```
