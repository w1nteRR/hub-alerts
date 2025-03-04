import { ModelPage, PornHub, VideoPage } from 'pornhub.js';
import { Injectable, NotFoundException } from '@nestjs/common';

const ph = new PornHub();

@Injectable()
export class PhubService {
  async getModel(name: string): Promise<ModelPage> {
    const model = await ph.model(name);

    if (!model) {
      throw new NotFoundException();
    }

    return model;
  }

  async getVideo(id: string): Promise<VideoPage> {
    const video = await ph.video(id);

    if (!video) {
      throw new NotFoundException();
    }

    return video;
  }
}
