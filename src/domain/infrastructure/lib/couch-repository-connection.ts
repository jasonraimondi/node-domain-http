import { injectable } from 'inversify';
import * as Nano from 'nano';
import { ServerScope } from 'nano';

@injectable()
export class CouchRepositoryConnection {
  public readonly couchDb: ServerScope;
  private readonly couchUser = process.env.COUCHDB_USER;
  private readonly couchPassword = process.env.COUCHDB_PASSWORD;
  private readonly couchHost = process.env.COUCHDB_HOST;
  private readonly couchPort = '5984';
  private readonly couchUri = `http://${this.couchUser}:${this.couchPassword}@${this.couchHost}:${this.couchPort}`;
  constructor() {
    this.couchDb = Nano(this.couchUri);
  }
}
