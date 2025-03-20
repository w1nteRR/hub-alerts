import { ICommand } from '@nestjs/cqrs';

export class CreateModelCommand implements ICommand {
  constructor(public readonly name: string) {}
}
