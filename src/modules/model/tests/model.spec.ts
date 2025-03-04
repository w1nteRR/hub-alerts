import { Video } from '../domain/entities/Video';
import { Model } from '../domain/entities/Model';

describe('Model', () => {
  it('should return first video of model videos', () => {
    const mockVideos: Video[] = [
      new Video('1', 'Video 1', 'http://video1.com', 111),
      new Video('2', 'Video 2', 'http://video2.com', 222),
    ];

    const model = new Model('Test Model', 'Some biography', mockVideos);

    expect(model.getNewestVideo()).toEqual(mockVideos[0]);
  });

  it('should return null if video array is empty', () => {
    const model = new Model('Test Model', 'Some biography', []);

    expect(model.getNewestVideo()).toBeNull();
  });
});
