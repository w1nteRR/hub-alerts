import { EventEmitter2 } from '@nestjs/event-emitter';
import { Event } from './event.base';

export abstract class AggregateRoot<T extends string> {
  private _domainEvents: Array<Event<T, object>> = [];

  get domainEvents(): Array<Event<T, object>> {
    return this._domainEvents;
  }

  protected addEvent<E extends Event<T, object>>(domainEvent: E): void {
    this._domainEvents.push(domainEvent);

    console.log('Added event', domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public async publishEvents(eventEmitter: EventEmitter2): Promise<void> {
    await Promise.all(
      this._domainEvents.map(async (event) => {
        console.log('event', event);
        return eventEmitter.emitAsync(event.constructor.name, event);
      }),
    );
  }
}
