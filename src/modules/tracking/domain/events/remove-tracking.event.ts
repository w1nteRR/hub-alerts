import { TrackingEvents } from '../events.enum';
import { Event } from '../../../../libs/event.base';

interface RemoveTrackingEventPayload {
  tracking_id: string;
}

export class RemoveTrackingEvent extends Event<
  TrackingEvents,
  RemoveTrackingEventPayload
> {
  type = TrackingEvents.REMOVE_TRACKING;
}
