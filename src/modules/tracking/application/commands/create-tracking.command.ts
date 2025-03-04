export class CreateTrackingCommand {
  constructor(
    public readonly telegram_id: number,
    public readonly tracking_id: string,
  ) {}
}
