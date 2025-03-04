import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException, Inject } from '@nestjs/common';
import { CreateTrackingCommand } from '../create-tracking.command';
import { TRACKING_REPOSITORY } from '../../../tracking.di-tokens';
import { ITrackingRepository } from '../../../domain/tracking.repository';
import { Tracking } from '../../../domain/entities/Tracking';

@CommandHandler(CreateTrackingCommand)
export class CreateTrackingCommandHandler
  implements ICommandHandler<CreateTrackingCommand>
{
  constructor(
    @Inject(TRACKING_REPOSITORY)
    private readonly trackingRepository: ITrackingRepository,
  ) {}

  async execute(command: CreateTrackingCommand): Promise<void> {
    const tracking = Tracking.create({
      tracking_id: command.tracking_id,
      telegram_id: command.telegram_id,
    });

    try {
      await this.trackingRepository.save(tracking);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }

      throw error;
    }
  }
}
