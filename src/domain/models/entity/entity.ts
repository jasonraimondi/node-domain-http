import { MaybeDocument } from 'nano';
import { Uuid } from './uuid';

export abstract class Entity<T> {
  public readonly id: string;
  public readonly createdAt: Date;

  public constructor(init?: Partial<T>, id?: string, createdAt?: Date) {
    Object.assign(this, init);
    if (!id) {
      id = Uuid.uuid4();
    }
    if (!createdAt) {
      createdAt = new Date();
    }
    this.id = id;
    this.createdAt = createdAt;
  }

  public toJSON(): T|MaybeDocument {
    return Object.getOwnPropertyNames(this).reduce((a, b) => {
      a[b] = this[b];
      return a;
    }, {});
  }
}
