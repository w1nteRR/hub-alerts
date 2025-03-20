import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TelegrafModule } from 'nestjs-telegraf';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelModule } from './modules/model/model.module';
import { BotModule } from './modules/telegraf/bot.module';
import { FirestoreModule } from './database/firestore.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    CqrsModule.forRoot(),
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_TOKEN') as string,
        // launchOptions: {
        //   webhook: {
        //     domain: '/',
        //     path: '/secret-path',
        //   },
        // },
      }),
    }),
    BotModule,
    ModelModule,
    FirestoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
