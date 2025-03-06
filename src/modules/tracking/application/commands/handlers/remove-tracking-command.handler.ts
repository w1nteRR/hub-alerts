import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Inject, NotFoundException } from '@nestjs/common';
import { RemoveTrackingCommand } from '../remove-tracking.command';
import { TRACKING_REPOSITORY } from '../../../tracking.di-tokens';
import { ITrackingRepository } from '../../../domain/tracking.repository';

@CommandHandler(RemoveTrackingCommand)
export class RemoveTrackingCommandHandler
  implements ICommandHandler<RemoveTrackingCommand>
{
  constructor(
    @Inject(TRACKING_REPOSITORY)
    private readonly trackingRepository: ITrackingRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: RemoveTrackingCommand): Promise<void> {
    try {
      const tracking = await this.trackingRepository.findById(
        command.tracking_id,
      );

      if (!tracking) {
        throw new NotFoundException();
      }

      tracking.remove();
      await this.trackingRepository.remove(tracking.trackingId);

      await tracking.publishEvents(this.eventEmitter);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
