import { Controller, Get, Res } from '@nestjs/common';

import { ListUsers } from '../../domain/action/user/list-users';
import { DomainService } from '../services/domain.service';

@Controller()
export class AppController {
  constructor(private readonly domainService: DomainService) {
  }

  @Get()
  public async root(@Res() res) {
    const response = await this.domainService.dispatchCommand(
      new ListUsers({
        page: 1,
        itemsPerPage: 15,
      }),
    );
    return res.json(response);
  }

  @Get('tables')
  public async tables(@Res() res) {
    const response = await this.domainService.repositoryFactory.repositoryCreator.setupTables();
    return res.json(response);
  }
}
