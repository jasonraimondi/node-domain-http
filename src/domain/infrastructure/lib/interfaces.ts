import { Entity } from '../../models/entity/entity';

export type GenericClassDecorator<T> = (target: T) => void;

export interface Type<T> {
  new(...args: any[]): T;
}

export interface Injector {
  resolve<T>(target: Type<IAction>): T|any;
}

export interface IAction {
}

export interface ICommand extends IAction {
  commandId: string;
}

export interface IQuery extends IAction {
}

export interface IActionHandler<T extends IAction = any> {
  execute(action: T);
}

export interface ICommandHandler<T extends IAction> {
}

export interface IQueryHandler<T extends IAction> {
}

export interface BaseRepository<T> {
  getById(id: string, withRevsInfo?: boolean): Promise<T>;
  create(entity: Entity<T> | any): Promise<any>;
  update(entity: Entity<T> | any): Promise<any>;
  createAll(entities: Array<Entity<T>> | any[]);
  delete(id: string, rev: string);
}

export interface IPagination {
  readonly page: number;
  readonly itemsPerPage: number;
}
