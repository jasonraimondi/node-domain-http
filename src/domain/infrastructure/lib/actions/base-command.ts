import { ICommand } from '../interfaces';
import { Uuid } from '../../../models/entity/uuid';

export abstract class BaseCommand implements ICommand {
  public readonly commandId: string;

  constructor(commandId?: string) {
    if (!commandId) {
      commandId = Uuid.uuid4();
    }
    this.commandId = commandId;
  }
}
