import 'reflect-metadata';

import { IActionHandler, Type } from '../interfaces';

export const ACTION_HANDLER_METADATA = '__actionHandler__';

export const Action = (actionHandler: Type<IActionHandler>): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(ACTION_HANDLER_METADATA, actionHandler.prototype.constructor, target);
  };
};
