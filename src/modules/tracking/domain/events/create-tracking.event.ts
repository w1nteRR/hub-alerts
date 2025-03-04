import { TrackingEvents } from '../events.enum';
import { Event } from '../../../../libs/event.base';

interface CreateTrackingEventPayload {
  telegram_id: number;
  tracking_id: string;
}

export class CreateTrackingEvent extends Event<
  TrackingEvents,
  CreateTrackingEventPayload
> {
  type = TrackingEvents.CREATE_TRACKING;
}
