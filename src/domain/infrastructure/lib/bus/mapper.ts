import { LoggerService } from '../../services/logger.service';
import { ACTION_HANDLER_METADATA } from '../decorators/action.decorator';
import { IAction, IActionHandler, Type } from '../interfaces';
import { InversifyContainer } from '../inversify.container';

export class Mapper {
  public static get types() {
    return {
      UnsplashService: Symbol.for('UnsplashService'),
      CouchImageRepository: Symbol.for('CouchImageRepository'),
      CouchUserRepository: Symbol.for('CouchUserRepository'),
    };
  }

  public constructor(
    private readonly inversifyContainer: InversifyContainer,
    private readonly logger: LoggerService,
  ) {
  }

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
}
