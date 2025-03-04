import { Injectable } from '@nestjs/common';
import { Mapper } from '../../libs/mapper.base';
import { ModelPage } from 'pornhub.js';
import { Model } from './domain/entities/Model';
import { Video } from './domain/entities/Video';

@Injectable()
export class ModelMapper extends Mapper<ModelPage, Model> {
  mapFrom(source: ModelPage): Model {
    return new Model(
      source.name,
      source.bio,
      source.mostRecentVideos.map(
        ({ id, title, url }) => new Video(id, title, url, 0),
      ),
    );
  }
}
