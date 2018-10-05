import { assert } from 'chai';

import { CreateUser } from '../../../src/domain/action/user/create-user';
import { Uuid } from '../../../src/domain/models/entity/uuid';
import { repositoryFactory, testingCommandBus } from '../../lib/bus/testing-command-bus';

describe('CreateUserHandler', () => {
  it('executes', async () => {
    const firstName = 'jason';
    const lastName = 'raimondi';
    const email = 'jason@Raimondi' + Uuid.uuid4() + '.com';
    const passwordString = 'password-one-two-three';
    const userId = Uuid.uuid4();

    const response = await testingCommandBus.execute(
      new CreateUser({
        email,
        passwordString,
        firstName,
        lastName,
        userId,
      }),
    );
    const user = await repositoryFactory.userRepository.getById(response.id);

    assert.isNotEmpty(user);
    assert.equal(user.id, userId);
    assert.equal(user.email, email);
    assert.equal(user.firstName, firstName);
    assert.equal(user.lastName, lastName);
  });
});
