import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Notification } from './entities';
import {
  CommentNotificationService,
  NotificationService,
  PostNotificationService,
} from './services';
import { NotificationGateway } from './notification.gateway';
import { NotificationController } from './notification.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [
    NotificationService,
    CommentNotificationService,
    PostNotificationService,
    NotificationGateway,
  ],
  controllers: [NotificationController],
  exports: [
    NotificationService,
    PostNotificationService,
    CommentNotificationService,
  ],
})
export class NotificationModule {}
