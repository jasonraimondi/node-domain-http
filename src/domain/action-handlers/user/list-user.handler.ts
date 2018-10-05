import { ListUsers } from '../../action/user/list-users';
import { ActionHandler } from '../../infrastructure/lib/decorators/action-handler.decorator';
import { IQueryHandler } from '../../infrastructure/lib/interfaces';
import { CouchUserRepository } from '../../infrastructure/repository/user/couch-user-repository';

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
