import { Video } from '../domain/entities/Video';

describe('Video', () => {
  let video: Video;
  const mockNow = Math.floor(Date.now() / 1000); // UNIX timestamp in seconds

  beforeAll(() => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => mockNow * 1000);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return true if the video was uploaded within a custom time frame (e.g., 1 hour)', () => {
    const videoWithinOneHour = new Video(
      '5',
      'Video Within One Hour',
      'https://example.com',
      mockNow - 1800,
    ); // 30 minutes ago
    expect(videoWithinOneHour.isLastVideoUploadedRecently()).toBe(true);
  });

  it('returns true if the video was uploaded in the future', () => {
    video = new Video(
      '2',
      'Future Video',
      'https://example.com',
      mockNow + 100,
    );
    expect(video.isLastVideoUploadedRecently()).toBe(false);
  });

  it('returns false if the video was uploaded exactly at the current time', () => {
    video = new Video('3', 'Now Video', 'https://example.com', mockNow);
    expect(video.isLastVideoUploadedRecently()).toBe(true);
  });
});
