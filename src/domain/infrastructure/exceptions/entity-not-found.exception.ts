import { BaseException } from './base.exception';

export class EntityNotFoundException extends BaseException {
  public static user() {
    return new EntityNotFoundException('UserEntity not found.');
  }

  public static oauthClient() {
    return new EntityNotFoundException('OAuthClient not found.');
  }

  public static type(entity) {
    return new EntityNotFoundException(`${entity.constructor.name} not found.`);
  }
}
