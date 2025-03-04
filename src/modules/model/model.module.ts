import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ModelMapper } from './model.mapper';
import { PhubService } from './infrastructure/phub/phub.service';
import { GetLastModelVideoHandler } from './application/queries/handlers/get-last-model-video.handler';
import { MODEL_REPOSITORY } from './model.di-tokens';
import { ModelRepositoryImpl } from './infrastructure/model.repository.impl';
import { ModelController } from './model.controller';
import { GetIsNewVideoUploadedHandler } from './application/queries/handlers/get-is-new-video-uploaded.handler';

const controllers = [ModelController];

const queryHandlers: Provider[] = [
  GetLastModelVideoHandler,
  GetIsNewVideoUploadedHandler,
];
const mappers: Provider[] = [ModelMapper];
const externalServices: Provider[] = [PhubService];

const repositories = [
  { provide: MODEL_REPOSITORY, useClass: ModelRepositoryImpl },
];

@Module({
  imports: [CqrsModule],
  controllers: [...controllers],
  providers: [
    ...queryHandlers,
    ...mappers,
    ...repositories,
    ...externalServices,
  ],
})
export class ModelModule {}
