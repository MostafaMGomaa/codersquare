import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Observer } from '../interfaces';
import { Notification } from '../entities';
import { NotificationPayload } from '../dto';
import { NotificationType } from '../enums';
import { NotificationGateway } from '../notification.gateway';

@Injectable()
export class PostNotificationService implements Observer {
  constructor(
    @InjectRepository(Notification)
    private notificationRepo: Repository<Notification>,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async update(
    type: NotificationType,
    payload: NotificationPayload,
  ): Promise<void> {
    if (type == NotificationType.NEW_LIKE_ON_POST) {
      this.notificationGateway.sendNotification(
        payload.recipientId,
        payload.message,
        payload.postId,
      );
      await this.notificationRepo.save(payload);
    }
  }
}
