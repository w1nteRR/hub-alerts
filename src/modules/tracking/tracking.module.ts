import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';

import { ModelController } from '../model/model.controller';
import { TRACKING_REPOSITORY } from './tracking.di-tokens';
import { TrackingRepositoryImpl } from './infrastructure/tracking.repository.impl';
import { CreateTrackingCommandHandler } from './application/commands/handlers/create-tracking-command.handler';
import { ShardResolver } from '../../libs/sharding/shard-resolver';
import { FirestoreModule } from '../../database/firestore.module';

const controllers = [ModelController];

const commandHandlers: Provider[] = [CreateTrackingCommandHandler];

const repositories = [
  { provide: TRACKING_REPOSITORY, useClass: TrackingRepositoryImpl },
];

@Module({
  imports: [CqrsModule, FirestoreModule],
  controllers: [...controllers],
  providers: [
    {
      provide: ShardResolver,
      useFactory: (configService: ConfigService) => {
        const totalShards = configService.get<number>('TOTAL_SHARDS') || 5;
        return new ShardResolver(totalShards);
      },
      inject: [ConfigService],
    },
    {
      provide: 'ITrackingRepository',
      useClass: TrackingRepositoryImpl,
    },
    ...repositories,
    ...commandHandlers,
  ],
  exports: ['ITrackingRepository'],
})
export class TrackingModuleModule {}
