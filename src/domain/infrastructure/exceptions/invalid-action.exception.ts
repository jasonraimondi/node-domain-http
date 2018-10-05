import { BaseException } from './base.exception';

export class InvalidActionException extends BaseException {

  public static invalidPassword() {
    return new InvalidActionException('Invalid Password.');
  }
}
