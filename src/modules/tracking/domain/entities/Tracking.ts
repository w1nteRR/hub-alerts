import { randomUUID } from 'node:crypto';

import { AggregateRoot } from '../../../../libs/aggregate-root.base';
import { TrackingEvents } from '../events.enum';
import { RemoveTrackingEvent } from '../events/remove-tracking.event';
import { CreateTrackingEvent } from '../events/create-tracking.event';

class TrackingCreate {
  constructor(
    // public readonly tracking_id: string,
    public readonly telegram_id: number,
  ) {}
}

export class Tracking extends AggregateRoot<TrackingEvents> {
  constructor(
    private readonly tracking_id: string,
    private readonly telegram_id: number,
  ) {
    super();
  }

  get telegramId(): number {
    return this.telegram_id;
  }

  get trackingId(): string {
    return this.tracking_id;
  }

  public remove(): void {
    this.addEvent(new RemoveTrackingEvent({ tracking_id: this.trackingId }));
  }

  public static create(create: TrackingCreate): Tracking {
    const trackingId: string = randomUUID();

    const tracking = new Tracking(trackingId, create.telegram_id);

    tracking.addEvent(
      new CreateTrackingEvent({
        tracking_id: trackingId,
        telegram_id: create.telegram_id,
      }),
    );

    return tracking;
  }
}
