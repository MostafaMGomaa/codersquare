import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  sendNotification(userId: string, message: string, postId: string) {
    this.server.emit('notification', { userId, message, postId });
  }
}
