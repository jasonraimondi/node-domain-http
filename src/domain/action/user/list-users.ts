import { ListUsersHandler } from '../../action-handlers/user/list-user.handler';
import { Action } from '../../infrastructure/lib/decorators/action.decorator';
import { IPagination } from '../../infrastructure/lib/interfaces';
import { BaseQuery } from '../../infrastructure/lib/actions/base-query';

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
