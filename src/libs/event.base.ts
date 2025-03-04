export abstract class Event<T extends string, E extends object> {
  public readonly payload: Readonly<E>;
  public type: T;
  public readonly occurredAt: Date;

  constructor(payload: E) {
    this.payload = Object.freeze(payload);
    this.occurredAt = new Date();
  }
}
