import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateModelCommand } from '../create-model.command';
import { Model } from '../../../domain/entities/Model';
import {
  MODEL_DB_REPOSITORY,
  MODEL_REPOSITORY,
} from '../../../model.di-tokens';
import { IModelRepository } from '../../../domain/model.repository';
import { IModelDbRepository } from '../../../domain/model-db.repository';

@CommandHandler(CreateModelCommand)
export class CreateModelCommandHandler
  implements ICommandHandler<CreateModelCommand>
{
  constructor(
    @Inject(MODEL_REPOSITORY)
    private readonly modelRepository: IModelRepository,
    @Inject(MODEL_DB_REPOSITORY)
    private readonly modelDbRepository: IModelDbRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: CreateModelCommand): Promise<void> {
    try {
      const model = await this.modelRepository.getModelByName(command.name);

      if (!model) throw new Error('No model found');

      const newestVideo = model.getNewestVideo();

      if (!newestVideo) throw new Error('No newest video found');

      const video = await this.modelRepository.getModelVideo(newestVideo.id);

      const createModel = Model.create(model, video.uploadTime);

      await this.modelDbRepository.save(createModel);
      await createModel.publishEvents(this.eventEmitter);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }

      throw error;
    }
  }
}
