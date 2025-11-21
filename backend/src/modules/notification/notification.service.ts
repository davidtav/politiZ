import { Injectable } from '@nestjs/common';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class NotificationService {
  constructor(private gateway: EventsGateway) {}

  send(userId: string, payload: any) {
    this.gateway.newNotification(userId, payload);
    return { delivered: true };
  }
}
