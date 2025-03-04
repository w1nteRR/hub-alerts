import { Injectable, UsePipes } from '@nestjs/common';
import { Ctx, InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { ValidateContextPipe } from '../pipes/validate-context.pipe';

@Injectable()
export class TelegramMessageService {
  constructor(@InjectBot() private bot: Telegraf) {}

  @UsePipes(new ValidateContextPipe())
  public async sendStartupMessage(@Ctx() ctx: Context): Promise<void> {
    await this.bot.telegram.sendMessage(ctx.from!.id, 'Startup', {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [[{ text: 'Start', callback_data: 's' }]],
      },
    });
  }

  public async sendNewVideoPostedMessage(url: string): Promise<void> {
    await this.bot.telegram.sendMessage(394329748, url);
  }
}
