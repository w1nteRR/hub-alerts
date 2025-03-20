import { Injectable } from '@nestjs/common';
import { ModelPage } from 'pornhub.js';

import { Mapper } from '../../libs/mapper.base';
import { Model } from './domain/entities/Model';
import { Video } from './domain/entities/Video';
import { ModelDocument } from '../../types/model/model.types';

@Injectable()
export class ModelMapper extends Mapper<ModelPage, Model> {
  mapFrom(source: ModelPage): Model {
    return new Model(
      '',
      source.name,
      source.bio,
      0,
      0,
      source.mostRecentVideos.map(
        ({ id, title, url }) => new Video(id, title, url, 0),
      ),
    );
  }

  mapToFirestore(source: Model): Partial<ModelDocument> {
    return {
      model_id: source.modelId,
      name: source.modelName,
      tracking_count: source.trackingCount,
      last_recently_uploaded: source.lastRecentlyUploaded,
    };
  }
}
