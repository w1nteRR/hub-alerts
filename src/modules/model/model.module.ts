import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ModelMapper } from './model.mapper';
import { PhubService } from './infrastructure/phub/phub.service';
import { GetLastModelVideoHandler } from './application/queries/handlers/get-last-model-video.handler';
import { MODEL_DB_REPOSITORY, MODEL_REPOSITORY } from './model.di-tokens';
import { ModelRepositoryImpl } from './infrastructure/model.repository.impl';
import { ModelController } from './model.controller';
import { GetIsNewVideoUploadedHandler } from './application/queries/handlers/get-is-new-video-uploaded.handler';
import { ModelFirestoreRepositoryImpl } from './infrastructure/model-firestore.repository.impl';
import { CreateModelCommandHandler } from './application/commands/handlers/create-model-command.handler';
import { FirestoreModule } from '../../database/firestore.module';
import { ShardingModule } from '../../libs/sharding/sharding.module';

const controllers = [ModelController];

const queryHandlers: Provider[] = [
  GetLastModelVideoHandler,
  GetIsNewVideoUploadedHandler,
];

const commandHandlers: Provider[] = [CreateModelCommandHandler];

const mappers: Provider[] = [ModelMapper];
const externalServices: Provider[] = [PhubService];

const repositories = [
  { provide: MODEL_REPOSITORY, useClass: ModelRepositoryImpl },
  { provide: MODEL_DB_REPOSITORY, useClass: ModelFirestoreRepositoryImpl },
];

@Module({
  imports: [CqrsModule, FirestoreModule, ShardingModule],
  controllers: [...controllers],
  providers: [
    ...queryHandlers,
    ...commandHandlers,
    ...mappers,
    ...repositories,
    ...externalServices,
  ],
})
export class ModelModule {}
