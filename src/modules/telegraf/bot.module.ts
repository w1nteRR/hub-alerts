import { Module, Provider } from '@nestjs/common';
import { TelegramMessageService } from './services/message.service';
import { TelegramService } from './services/bot.service';
import { NewVideoUploadedHandler } from './handlers/new-video-uploaded.handler';

const handlers: Provider[] = [NewVideoUploadedHandler];

@Module({
  providers: [TelegramService, TelegramMessageService, ...handlers],
})
export class BotModule {}
