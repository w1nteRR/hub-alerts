import { Module } from '@nestjs/common';
import { ShardResolver } from './shard-resolver';

@Module({
  providers: [
    {
      provide: ShardResolver,
      useFactory: () => new ShardResolver(5),
    },
  ],
  exports: [ShardResolver],
})
export class ShardingModule {}
