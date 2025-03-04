import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IModelRepository } from '../../../domain/model.repository';
import { MODEL_REPOSITORY } from '../../../model.di-tokens';
import { GetIsNewVideoUploadedQuery } from '../get-is-new-video-uploaded.query';
import { EventEmitter2 } from '@nestjs/event-emitter';

@QueryHandler(GetIsNewVideoUploadedQuery)
export class GetIsNewVideoUploadedHandler
  implements IQueryHandler<GetIsNewVideoUploadedQuery>
{
  constructor(
    @Inject(MODEL_REPOSITORY)
    private readonly modelRepository: IModelRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(query: GetIsNewVideoUploadedQuery): Promise<void> {
    const model = await this.modelRepository.getModelByName(query.model_name);

    if (!model) {
      throw new Error(`Model with name ${query.model_name} not found`);
    }

    model.newVideoUploaded();

    await model.publishEvents(this.eventEmitter);
  }
}
