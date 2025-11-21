import { Body, Controller, Param, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post(':userId')
  send(@Param('userId') userId: string, @Body() body: any) {
    return this.notificationService.send(userId, body);
  }
}
