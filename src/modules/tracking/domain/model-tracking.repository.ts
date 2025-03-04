import { ModelName, TrackingModel } from './entities/TrackingModel';

export interface IModelTrackingRepository {
  addModelToTracking(modelName: ModelName): Promise<TrackingModel>;
  removeModelFromTracking(modelName: ModelName): Promise<TrackingModel>;
}
