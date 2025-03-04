import { Video } from './Video';
import { AggregateRoot } from '../../../../libs/aggregate-root.base';
import { ModelEvents } from '../events.enum';
import { VideoRecentlyUploadedEvent } from '../events/model-video-recently-uploaded.event';

export class Model extends AggregateRoot<ModelEvents> {
  constructor(
    private readonly name: string,
    private readonly biography: string,
    public readonly videos: Video[],
  ) {
    super();
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
}
