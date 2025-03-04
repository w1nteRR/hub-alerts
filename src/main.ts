import { NestFactory } from '@nestjs/core';
import { getBotToken } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const bot: Telegraf = app.get(getBotToken());

  // app.use(bot.webhookCallback('/secret-path'));
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
