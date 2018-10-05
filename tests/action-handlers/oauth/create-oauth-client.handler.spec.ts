import { assert } from 'chai';

import { CreateOAuthClient } from '../../../src/domain/action/oauth/create-oauth-client';
import { Uuid } from '../../../src/domain/models/entity/uuid';
import { repositoryFactory, testingCommandBus } from '../../lib/bus/testing-command-bus';

describe('CreateOAuthClientHandler', () => {
  it('executes', async () => {
    const clientId = Uuid.uuid4();
    const grants = 'jason';
    const redirectUris = 'raimondi';
    const secret = 'jason@Raimondi' + Uuid.uuid4() + '.com';
    const accessTokenLifetime = 15;
    const refreshTokenLifetime = 15;
    const userId = Uuid.uuid4();

    const response = await testingCommandBus.execute(
      new CreateOAuthClient({
        clientId,
        secret,
        accessTokenLifetime,
        refreshTokenLifetime,
        grants,
        redirectUris,
        userId,
      }),
    );
    const clientEntity = await repositoryFactory.oauthClientRepository.getById(response.id);

    assert.isNotEmpty(clientEntity);
    assert.equal(clientEntity.id, clientId);
    assert.equal(clientEntity.clientId, clientId);
    assert.equal(clientEntity.grants, grants);
    assert.equal(clientEntity.secret, secret);
    assert.equal(clientEntity.refreshTokenLifetime, refreshTokenLifetime);
    assert.equal(clientEntity.accessTokenLifetime, accessTokenLifetime);
    assert.equal(clientEntity.userId, userId);
  });
});
