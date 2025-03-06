import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
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
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: CreateTrackingCommand): Promise<void> {
    const tracking = Tracking.create({
      user_id: command.user_id,
    });

    try {
      await this.trackingRepository.save(tracking);

      await tracking.publishEvents(this.eventEmitter);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }

      throw error;
    }
  }
}
