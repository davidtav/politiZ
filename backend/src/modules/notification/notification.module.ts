import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { EventsGateway } from '../events/events.gateway';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, EventsGateway],
  exports: [NotificationService]
})
export class NotificationModule {}
