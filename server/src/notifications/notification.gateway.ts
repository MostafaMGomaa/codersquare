import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { NotificationType } from './enums';

@WebSocketGateway({ cors: true })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  sendNotification(
    userId: string,
    message: string,
    postId: string,
    type: NotificationType,
  ) {
    this.server.emit('notification', { userId, message, postId, type });
  }
}
