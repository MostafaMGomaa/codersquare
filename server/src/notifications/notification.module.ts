import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Notification } from './entities';
import {
  CommentNotificationService,
  NotificationService,
  PostNotificationService,
} from './services';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [
    CommentNotificationService,
    NotificationService,
    PostNotificationService,
    NotificationGateway,
  ],
  exports: [NotificationService],
})
export class NotificationModule implements OnModuleInit {
  constructor(
    private notificationService: NotificationService,
    private commentNotificationService: CommentNotificationService,
    private postNotificationService: PostNotificationService,
  ) {}

  onModuleInit() {
    this.notificationService.addObserver(this.postNotificationService);
    this.notificationService.addObserver(this.commentNotificationService);
  }
}
