export class DatabaseList {
  public static readonly USER = 'users';
  public static readonly IMAGE = 'images';
  public static readonly OAUTH_ACCESS_TOKEN = 'oauth-access-tokens';
  public static readonly OAUTH_REFRESH_TOKEN = 'oauth-refresh-tokens';
  public static readonly OAUTH_AUTHORIZATION_CODE = 'oauth-authorization-codes';
  public static readonly OAUTH_CLIENT = 'oauth-clients';

  public static listAllRepositories() {
    const repositories: string[] = [];
    for (const i in DatabaseList) {
      if (DatabaseList.hasOwnProperty(i)) { repositories.push(DatabaseList[i]); }
    }
    return repositories;
  }
}
