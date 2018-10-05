import { IsEmail, Length } from 'class-validator';

import { CreateUserHandler } from '../../action-handlers/user/create-user.handler';
import { Action } from '../../infrastructure/lib/decorators/action.decorator';
import { Uuid } from '../../models/entity/uuid';
import { BaseCommand } from '../../infrastructure/lib/actions/base-command';

export interface ICreateUser {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly passwordString: string;
  readonly userId?: string;
}

@Action(CreateUserHandler)
export class CreateUser extends BaseCommand implements ICreateUser {
  @Length(8, 128)
  public readonly passwordString: string;
  @IsEmail()
  public readonly email: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly userId: string;

  public constructor(init: ICreateUser, commandId?: string) {
    super(commandId);
    Object.assign(this, init);
    if (!this.userId) {
      this.userId = Uuid.uuid4();
    }
  }
}
