import { Model } from '../entities/Model';
import { Event } from '../../../../libs/event.base';
import { ModelEvents } from '../events.enum';

interface CreateModelEventPayload {
  model: Model;
}

export class CreateModelEvent extends Event<
  ModelEvents,
  CreateModelEventPayload
> {
  type = ModelEvents.CREATE_MODEL;
}
