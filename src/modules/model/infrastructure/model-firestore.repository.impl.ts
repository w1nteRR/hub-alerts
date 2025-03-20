import { FieldValue, Firestore } from '@google-cloud/firestore';
import { Injectable } from '@nestjs/common';
import { IModelDbRepository } from '../domain/model-db.repository';
import { Model } from '../domain/entities/Model';
import { ShardResolver } from '../../../libs/sharding/shard-resolver';
import { ModelMapper } from '../model.mapper';

@Injectable()
export class ModelFirestoreRepositoryImpl implements IModelDbRepository {
  constructor(
    private readonly firestore: Firestore,
    private readonly shardResolver: ShardResolver,
    private readonly mapper: ModelMapper,
  ) {}

  private getShardCollectionName(id: string): [string, number] {
    const shard = this.shardResolver.getShardKey(id);
    const shardId = Number(shard.split('-')[1]);

    return [`models_${shard}`, shardId];
  }

  public async save(model: Model): Promise<void> {
    const modelDocument = this.mapper.mapToFirestore(model);

    const [collectionName, shardId] = this.getShardCollectionName(
      model.modelId,
    );
    const collection = this.firestore
      .collection(collectionName)
      .doc(model.modelId);

    await collection.set({
      ...modelDocument,
      shard: shardId,
      created_at: FieldValue.serverTimestamp(),
    });

    console.log(
      `✅ Model added to ${collectionName} with ID: ${model.modelId}`,
    );
  }

  public async remove(modelId: string): Promise<void> {
    const [collectionName] = this.getShardCollectionName(modelId);

    await this.firestore.collection(collectionName).doc(modelId).delete();
  }
}
