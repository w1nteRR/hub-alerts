import { Tracking } from './entities/Tracking';

export interface ITrackingRepository {
  save(tracking: Tracking): Promise<Tracking>;
  remove(trackingId: string): Promise<void>;
}
