import { Event } from '../../../../../libs/event.base';

import { ModelName } from '../../entities/TrackingModel';
import { TrackingEvents } from '../../events.enum';

interface IAddModelToTrackingEventPayload {
  model_name: ModelName;
}

export class AddModelToTrackingEvent extends Event<
  TrackingEvents,
  IAddModelToTrackingEventPayload
> {
  type = TrackingEvents.ADD_TRACKING_MODEL;
}
