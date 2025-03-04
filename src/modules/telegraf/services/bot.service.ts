import { Injectable } from '@nestjs/common';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TelegramMessageService } from './message.service';

@Injectable()
@Update()
export class TelegramService {
  constructor(private readonly messageService: TelegramMessageService) {}

  @Start()
  async start(@Ctx() ctx: Context): Promise<void> {
    console.log('context', ctx);
    await this.messageService.sendStartupMessage(ctx);
  }
}
