import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { VideoRecentlyUploadedEvent } from '../../model/domain/events/model-video-recently-uploaded.event';
import { TelegramMessageService } from '../services/message.service';

@Injectable()
export class NewVideoUploadedHandler {
  constructor(private readonly messageService: TelegramMessageService) {}

  @OnEvent('VideoRecentlyUploadedEvent')
  async handleVideoRecentlyUploaded(event: VideoRecentlyUploadedEvent) {
    await this.messageService.sendNewVideoPostedMessage(
      event.payload.video._url,
    );
  }
}
