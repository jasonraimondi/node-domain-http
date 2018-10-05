import { injectable } from 'inversify';

import { ImageEntity } from '../../../models/image/image.entity';
import { CouchRepositoryConnection } from '../../lib/couch-repository-connection';
import { DatabaseList } from '../../lib/database/databaseList';
import { BaseCouchRepository } from '../base-couch-repository';

@injectable()
export class CouchImageRepository extends BaseCouchRepository<ImageEntity> {
  public constructor(db: CouchRepositoryConnection) {
    super(db.couchDb.db.use(DatabaseList.USER));
  }

  protected entityFromDocument(init: Partial<ImageEntity>): ImageEntity {
    return new ImageEntity(init);
  }
}
