import { Model } from './entities/Model';
import { Video } from './entities/Video';

export interface IModelRepository {
  getModelByName(name: string): Promise<Model | null>;
  getModelVideo(id: string): Promise<Video>;
}
