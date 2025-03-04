import { Video } from '../entities/Video';
import { Event } from '../../../../libs/event.base';
import { ModelEvents } from '../events.enum';

interface VideoRecentlyUploadedEventPayload {
  video: Video;
}

export class VideoRecentlyUploadedEvent extends Event<
  ModelEvents,
  VideoRecentlyUploadedEventPayload
> {
  type = ModelEvents.RECENTLY_VIDEO_UPLOADED;
}
