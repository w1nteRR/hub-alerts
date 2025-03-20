import { randomUUID } from 'node:crypto';
import { Video } from './Video';
import { AggregateRoot } from '../../../../libs/aggregate-root.base';
import { ModelEvents } from '../events.enum';
import { VideoRecentlyUploadedEvent } from '../events/model-video-recently-uploaded.event';
import { CreateModelEvent } from '../events/create-model.event';

export class Model extends AggregateRoot<ModelEvents> {
  constructor(
    private readonly model_id: string,
    private readonly name: string,
    private readonly biography: string,
    private readonly tracking_count: number,
    private readonly last_recently_uploaded: number,
    public readonly videos: Video[],
  ) {
    super();
  }

  public static create(create: Model, lastUploadTime: number): Model {
    const modelId: string = randomUUID();
    const tracking_count = 1;

    const model = new Model(
      modelId,
      create.name,
      '',
      tracking_count,
      lastUploadTime,
      [],
    );

    model.addEvent(new CreateModelEvent({ model }));

    return model;
  }

  public getNewestVideo(): Video | null {
    return this.videos.length ? this.videos[0] : null;
  }

  public getVideos(): ReadonlyArray<Video> {
    return this.videos;
  }

  public newVideoUploaded(): void {
    const video = this.getNewestVideo();

    if (!video) {
      throw new Error('Not implemented');
    }

    if (video.isLastVideoUploadedRecently()) {
      this.addEvent(new VideoRecentlyUploadedEvent({ video }));
    }
  }

  get modelId(): string {
    return this.model_id;
  }

  get modelName(): string {
    return this.name;
  }

  get trackingCount(): number {
    return this.tracking_count;
  }

  get lastRecentlyUploaded(): number {
    return this.last_recently_uploaded;
  }
}
