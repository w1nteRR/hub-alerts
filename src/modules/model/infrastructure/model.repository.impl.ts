import { Injectable } from '@nestjs/common';
import { IModelRepository } from '../domain/model.repository';
import { Model } from '../domain/entities/Model';
import { PhubService } from './phub/phub.service';
import { ModelMapper } from '../model.mapper';
import { Video } from '../domain/entities/Video';

@Injectable()
export class ModelRepositoryImpl implements IModelRepository {
  constructor(
    private readonly phubService: PhubService,
    private readonly mapper: ModelMapper,
  ) {}

  async getModelByName(name: string): Promise<Model | null> {
    const model = await this.phubService.getModel(name);

    return Promise.resolve(this.mapper.mapFrom(model));
  }

  async getModelVideo(id: string): Promise<Video> {
    const video = await this.phubService.getVideo(id);

    return Promise.resolve(
      new Video(
        video.id,
        video.title,
        video.url,
        new Date(video.uploadDate).getTime() / 1000,
      ),
    );
  }
}
