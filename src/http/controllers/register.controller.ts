import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { CreateUser } from '../../domain/action/user/create-user';
import { DomainService } from '../services/domain.service';

export interface RegisterUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Controller('register')
export class RegisterController {
  constructor(
    private readonly domainService: DomainService,
  ) {
  }

  @Get()
  public async root(@Res() res) {
    return res.render('register.njk');
  }

  @Post()
  public async register(@Res() res, @Body() body: RegisterUserDTO) {
    let response;
    const errors = [];

    try {
      response = await this.domainService.dispatchCommand(
        new CreateUser({
          email: body.email,
          passwordString: body.password,
          firstName: body.firstName,
          lastName: body.lastName,
        }),
      );
    } catch (e) {
      errors.push(e.message);
    }

    if (errors.length > 0) {
      const { password, ...bodyWithoutPassword } = body;
      return res.render('register.njk', {
        errors,
        ...bodyWithoutPassword,
      });
    }

    return res.json(response);
  }
}
