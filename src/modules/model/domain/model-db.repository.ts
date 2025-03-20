import { Model } from './entities/Model';

export interface IModelDbRepository {
  save(model: Model): Promise<void>;
  remove(modelId: string): Promise<void>;
}
