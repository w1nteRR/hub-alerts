import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetLastVideoQuery } from './application/queries/get-last-model-video.query';
import { GetIsNewVideoUploadedQuery } from './application/queries/get-is-new-video-uploaded.query';

@Controller('models')
export class ModelController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('model/:name')
  async getLastModelVideo(@Param('name') name: string) {
    const video: unknown = await this.queryBus.execute(
      new GetLastVideoQuery(name),
    );

    return { message: 'Works', video };
  }

  @Get('model/recently/:name')
  async getRecentlyVideo(@Param('name') name: string) {
    await this.queryBus.execute(new GetIsNewVideoUploadedQuery(name));

    return { message: 'Works' };
  }
}
