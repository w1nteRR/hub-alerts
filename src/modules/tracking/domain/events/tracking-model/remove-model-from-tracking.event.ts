import { ModelName } from '../../entities/TrackingModel';
import { TrackingEvents } from '../../events.enum';
import { Event } from '../../../../../libs/event.base';

export interface IRemoveModelFromTrackingEventPayload {
  model_name: ModelName;
}

export class RemoveModelFromTrackingEventPayload extends Event<
  TrackingEvents,
  IRemoveModelFromTrackingEventPayload
> {
  type = TrackingEvents.REMOVE_TRACKING_MODEL;
}
