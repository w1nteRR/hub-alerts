import * as crypto from 'node:crypto';

export class ShardResolver {
  constructor(private readonly totalShards: number) {
    if (totalShards <= 0) {
      throw new Error('totalShards must be greater than 0');
    }
  }

  public getShardKey(id: string): string {
    const hash = crypto.createHash('sha256').update(id).digest('hex');
    const shardNumber = parseInt(hash.slice(0, 8), 16) % this.totalShards;

    return `shard-${shardNumber}`;
  }
}
