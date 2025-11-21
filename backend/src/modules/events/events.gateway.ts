import { WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer() server!: Server;

  handleConnection() {}

  feedUpdate(channelId: string, post: any) {
    this.server.emit('feed_update', { channelId, post });
  }

  newNotification(userId: string, notification: any) {
    this.server.emit(`new_notification:${userId}`, notification);
  }
}
