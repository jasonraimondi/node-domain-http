import { assert } from 'chai';

import { ListUsers } from '../../../src/domain/action/user/list-users';
import { testingCommandBus } from '../../lib/bus/testing-command-bus';

describe('ListUsersHandler', () => {
  it('executes', async () => {
    const page = 1;
    const itemsPerPage = 2;

    const response = await testingCommandBus.execute(
      new ListUsers({
        page,
        itemsPerPage,
      }),
    );

    assert.isTrue(response.total_rows > 0);
  });
});
