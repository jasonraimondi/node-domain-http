import { injectable } from 'inversify';

import { UserEntity } from '../../../models/user/user.entity';
import { CouchRepositoryConnection } from '../../lib/couch-repository-connection';
import { DatabaseList } from '../../lib/database/databaseList';
import { BaseCouchRepository } from '../base-couch-repository';

@injectable()
export class CouchUserRepository extends BaseCouchRepository<UserEntity> {
  public constructor(db: CouchRepositoryConnection) {
    super(db.couchDb.db.use(DatabaseList.USER));
  }

  public async getByEmail(email: string): Promise<UserEntity | false> {
    const userFields = await this.getByFirstFieldAndValue('email', email);
    if (!userFields) { return false; }
    return new UserEntity({...userFields}, userFields.id);
  }

  protected entityFromDocument(init: Partial<UserEntity>): UserEntity {
    return new UserEntity(init, init.id);
  }
}
