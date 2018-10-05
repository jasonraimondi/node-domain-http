import * as nano from 'nano';

import { BaseCouchRepository } from '../../repository/base-couch-repository';
import { DatabaseList } from './databaseList';

export class RepositoryCreator {
  public constructor(public readonly couchDb: nano.ServerScope) {}

  public async setupTables() {
    const db = this.couchDb.db;
    const repositoryList = DatabaseList.listAllRepositories();
    await BaseCouchRepository.asyncForEach(repositoryList, async (table) => {
      try {
        await db.create(table);
      } catch (e) {
        console.log(e.message, table);
      }
    });
  }
}
