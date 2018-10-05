import 'reflect-metadata';
import { GenericClassDecorator, Type } from '../interfaces';

export const ActionHandler = (): GenericClassDecorator<Type<object>> => {
  return (target: Type<object>) => {
    // do something with `target`, e.g. some kind of validation or passing it to the Injector and store them
  };
};
