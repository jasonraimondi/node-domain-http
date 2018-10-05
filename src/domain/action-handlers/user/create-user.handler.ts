import * as bcrypt from 'bcryptjs';

import { CreateUser } from '../../action/user/create-user';
import { ActionHandler } from '../../infrastructure/lib/decorators/action-handler.decorator';
import { ICommandHandler } from '../../infrastructure/lib/interfaces';
import { CouchUserRepository } from '../../infrastructure/repository/user/couch-user-repository';
import { UserEntity } from '../../models/user/user.entity';

@ActionHandler()
export class CreateUserHandler implements ICommandHandler<CreateUser> {
  private readonly SALT = bcrypt.genSaltSync(10);

  public constructor(
    private readonly userRepository: CouchUserRepository,
  ) {
  }

  public async execute(command: CreateUser): Promise<any> {
    const existingUser = await this.userRepository.getByEmail(command.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const passwordHash = await bcrypt.hash(command.passwordString, this.SALT);
    const user = new UserEntity({
      firstName: command.firstName,
      lastName: command.lastName,
      email: command.email,
      passwordHash,
    }, command.userId);
    return await this.userRepository.create(user);
  }
}
