import { Firestore } from '@google-cloud/firestore';
import { Tracking } from '../domain/entities/Tracking';
import { ITrackingRepository } from '../domain/tracking.repository';
import { ShardResolver } from '../../../libs/sharding/shard-resolver';
import { FirestoreCollections } from '../../../types/firestore/firestore.types';

export class TrackingRepositoryImpl implements ITrackingRepository {
  constructor(
    private readonly shardResolver: ShardResolver,
    private readonly firestore: Firestore,
  ) {}

  public async save(tracking: Tracking): Promise<Tracking> {
    const shardKey = this.shardResolver.getShardKey(tracking.trackingId);

    const trackingProps = { shardKey };

    await this.firestore
      .collection(FirestoreCollections.Tracking)
      .doc(tracking.trackingId)
      .set({ ...tracking, trackingProps });

    return Promise.resolve(tracking);
  }

  public async findById(trackingId: string): Promise<Tracking | null> {
    const tracking = await this.firestore
      .collection(FirestoreCollections.Tracking)
      .doc(trackingId)
      .get();

    if (!tracking.exists) return null;

    return tracking.data() as Tracking;
  }

  public async remove(trackingId: string): Promise<void> {
    await this.firestore
      .collection(FirestoreCollections.Tracking)
      .doc(trackingId)
      .delete();
  }
}
