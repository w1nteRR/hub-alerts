import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { CreateTrackingCommand } from './application/commands/create-tracking.command';
import { RemoveTrackingCommand } from './application/commands/remove-tracking.command';

class CreateTrackingDto {
  telegram_id: number;
}

@Controller('tracking')
export class TrackingController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post()
  async createTracking(@Body() createTrackingDto: CreateTrackingDto) {
    await this.queryBus.execute(
      new CreateTrackingCommand(createTrackingDto.telegram_id),
    );
  }

  @Delete(':id')
  async removeTracking(@Param('id') id: string) {
    await this.queryBus.execute(new RemoveTrackingCommand(id));
  }
}
