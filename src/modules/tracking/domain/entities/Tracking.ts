import { randomUUID } from 'node:crypto';

import { AggregateRoot } from '../../../../libs/aggregate-root.base';
import { TrackingEvents } from '../events.enum';
import { RemoveTrackingEvent } from '../events/remove-tracking.event';
import { CreateTrackingEvent } from '../events/create-tracking.event';

class TrackingCreate {
  constructor(public readonly user_id: number) {}
}

export class Tracking extends AggregateRoot<TrackingEvents> {
  constructor(
    private readonly tracking_id: string,
    private readonly user_id: number,
  ) {
    super();
  }

  public static create(create: TrackingCreate): Tracking {
    const trackingId: string = randomUUID();

    const tracking = new Tracking(trackingId, create.user_id);

    tracking.addEvent(
      new CreateTrackingEvent({
        tracking_id: trackingId,
        user_id: create.user_id,
      }),
    );

    return tracking;
  }

  public remove(): void {
    this.addEvent(new RemoveTrackingEvent({ tracking_id: this.trackingId }));
  }

  get userId(): number {
    return this.user_id;
  }

  get trackingId(): string {
    return this.tracking_id;
  }
}
