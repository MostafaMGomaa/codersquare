import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationType } from './enums';

@WebSocketGateway({ cors: true })
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  // TODO:
  // afterInit(server: Server) {
  //   server.use()
  // }

  handleConnection(client: Socket) {
    const userId =
      client.handshake.auth.userId || client.handshake.query.userId;

    if (userId) {
      client.join(`user-${userId}`);
      console.log(`Client ${userId} connected`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.auth.userId;
    if (userId) {
      client.leave(`user-${userId}`);
      console.log(`Client ${userId} disconnected`);
    }
  }

  sendNotification(
    userId: string,
    message: string,
    postId: string,
    type: NotificationType,
    createdAt: Date,
  ) {
    console.log(`Emitting notification to ${userId}`);
    this.server
      .to(`user-${userId}`)
      .emit('notification', { userId, message, postId, type, createdAt });
  }
}
