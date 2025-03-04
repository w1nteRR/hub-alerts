export class Video {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly url: string,
    private readonly upload_time: number,
  ) {}

  public get uploadTime(): number {
    return this.upload_time;
  }

  public get id(): string {
    return this._id;
  }

  public get _url(): string {
    return this.url;
  }

  public isLastVideoUploadedRecently(): boolean {
    const timestamp = Math.floor(Date.now() / 1000);

    return this.upload_time <= timestamp;
  }
}
