import { validate } from 'class-validator';
import { IAction } from '../interfaces';
import { Mapper } from './mapper';

export class CommandBus {
  constructor(private readonly mapper: Mapper) {
  }

  public async execute(command: IAction) {
    await this.guardAgainstInvalidCommandParams(command);
    const handler = this.mapper.getCommandHandlerFromCommand(command);
    return await handler.execute(command);
  }

  private async guardAgainstInvalidCommandParams(command: IAction): Promise<void> {
    const val = await validate(command);
    const errors = {};

    val.forEach((err) => {
      const issues = Object.values(err.constraints).join(', ');
      if (!errors.hasOwnProperty(err.property)) {
        errors[err.property] = [];
      }
      errors[err.property].push(`[${err.property}]: ${issues}`);
    });

    if (Object.values(errors).length > 0) {
      throw new Error(Object.values(errors).join(', '));
    }
  }
}
