import { Tracking } from './Tracking';
import { AddModelToTrackingEvent } from '../events/tracking-model/add-model-to-tracking.event';
import { RemoveModelFromTrackingEventPayload } from '../events/tracking-model/remove-model-from-tracking.event';

export type ModelName = string;

export class TrackingModel extends Tracking {
  private readonly models: Set<ModelName>;

  constructor(tracking_id: string, telegram_id: number, models: ModelName[]) {
    super(tracking_id, telegram_id);
    this.models = new Set(models);
  }

  public addModel(modelName: ModelName): void {
    this.models.add(modelName);

    this.addEvent(new AddModelToTrackingEvent({ model_name: modelName }));
  }

  public removeModel(modelName: ModelName): void {
    this.models.delete(modelName);

    this.addEvent(
      new RemoveModelFromTrackingEventPayload({ model_name: modelName }),
    );
  }

  public getModels(): ModelName[] {
    return Array.from(this.models);
  }
}
