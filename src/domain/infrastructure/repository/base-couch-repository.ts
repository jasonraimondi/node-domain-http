import { DocumentInsertResponse, DocumentListParams, DocumentScope } from 'nano';

import { Entity } from '../../models/entity/entity';
import { BaseRepository } from '../lib/interfaces';

export abstract class BaseCouchRepository<T extends Entity<T>> implements BaseRepository<T> {
  public static async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  protected constructor(protected readonly repository: DocumentScope<T>) {
  }

  public async getById(id: string, withRevsInfo: boolean = true): Promise<T> {
    const entityPartial = await this.repository.get(id, { revs_info: withRevsInfo });
    return this.entityFromDocument(entityPartial);
  }

  public async create(entity: Entity<T> | any): Promise<DocumentInsertResponse> {
    return await this.repository.insert(entity.toJSON(), entity.id);
  }

  public async update(entity: Entity<T> | any): Promise<DocumentInsertResponse> {
    return await this.repository.insert(entity.toJSON(), entity.id);
  }

  public async createAll(entities: Array<Entity<T>> | any[]) {
    BaseCouchRepository.asyncForEach(entities, async (res) => {
      await this.create(res);
    });
  }

  public async list(params?: DocumentListParams) {
    return await this.repository.list(params);
  }

  public async delete(id: string, rev: string) {
    return await this.repository.destroy(id, rev);
  }

  protected abstract entityFromDocument(init: Partial<T>): T;

  protected async getByFirstFieldAndValue(field: string, value: string): Promise<Partial<T> | false> {
    const response = await this.repository.find({
      limit: 1,
      selector: { [field]: value },
    });

    if (response.docs.length === 0) {
      return false;
    }

    return response.docs[0];
  }
}
