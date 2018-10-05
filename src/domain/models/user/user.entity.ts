import * as bcrypt from 'bcryptjs';
import { User } from 'oauth2-server';

import { Entity } from '../entity/entity';

export class UserEntity extends Entity<UserEntity> implements User {
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public passwordHash?: string;
  public async isValidPassword(attempt: string): Promise<boolean> {
      return await bcrypt.compare(attempt, this.passwordHash);
  }
}
