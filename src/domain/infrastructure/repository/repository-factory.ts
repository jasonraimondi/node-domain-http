import { CouchRepositoryConnection } from '../lib/couch-repository-connection';
import { RepositoryCreator } from '../lib/database/repository-creator';
import { LoggerService } from '../services/logger.service';
import { CouchImageRepository } from './image/couchImageRepository';
import { CouchOAuthAccessTokenRepository } from './oauth/couch-oauth-access-token-repository';
import { CouchOAuthAuthorizationCodeRepository } from './oauth/couch-oauth-authorization-code.repository';
import { CouchOAuthClientRepository } from './oauth/couch-oauth-client-repository';
import { CouchOAuthRefreshTokenRepository } from './oauth/couch-oauth-refresh-token.repository';
import { CouchUserRepository } from './user/couch-user-repository';

export class RepositoryFactory {
  constructor(
    private readonly repositoryConnection: CouchRepositoryConnection,
    private readonly logger?: LoggerService,
  ) {}

  public get repositoryCreator() {
    return new RepositoryCreator(this.repositoryConnection.couchDb);
  }

  public get oauthClientRepository() {
    return new CouchOAuthClientRepository(this.repositoryConnection);
  }

  public get oauthAccessTokenRepository() {
    return new CouchOAuthAccessTokenRepository(this.repositoryConnection);
  }

  public get oauthAuthorizationCodeRepository() {
    return new CouchOAuthAuthorizationCodeRepository(this.repositoryConnection);
  }

  public get oauthRefreshTokenRepository() {
    return new CouchOAuthRefreshTokenRepository(this.repositoryConnection);
  }

  public get userRepository() {
    return new CouchUserRepository(this.repositoryConnection);
  }

  public get imageRepository() {
    return new CouchImageRepository(this.repositoryConnection);
  }
}
