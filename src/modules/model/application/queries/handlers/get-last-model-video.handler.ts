import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetLastVideoQuery } from '../get-last-model-video.query';
import { IModelRepository } from '../../../domain/model.repository';
import { MODEL_REPOSITORY } from '../../../model.di-tokens';
import { Video } from '../../../domain/entities/Video';

@QueryHandler(GetLastVideoQuery)
export class GetLastModelVideoHandler
  implements IQueryHandler<GetLastVideoQuery>
{
  constructor(
    @Inject(MODEL_REPOSITORY)
    private readonly modelRepository: IModelRepository,
  ) {}

  async execute(query: GetLastVideoQuery): Promise<Video | null> {
    const model = await this.modelRepository.getModelByName(query.model_name);

    if (!model) {
      throw new Error(`Model with name ${query.model_name} not found`);
    }

    const lastVideo = model.getNewestVideo();

    if (!lastVideo) {
      throw new Error('No videos found for this model');
    }

    return await this.modelRepository.getModelVideo(lastVideo.id);
  }
}
