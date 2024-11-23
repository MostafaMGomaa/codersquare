import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Observer } from '../interfaces';
import { NotificationType } from '../enums';
import { NotificationPayload } from '../dto';
import { PostNotificationService } from './post-notification.service';
import { CommentNotificationService } from './comment-notification.service';
import { Notification } from '../entities';
import { DataResult } from '@codersquare/shared';

@Injectable()
export class NotificationService implements OnApplicationBootstrap {
  private observers: Observer[] = [];

  constructor(
    private postNotificationService: PostNotificationService,
    private commentNotificationService: CommentNotificationService,
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  onApplicationBootstrap() {
    this.addObserver(this.postNotificationService);
    this.addObserver(this.commentNotificationService);
  }

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  notify(type: NotificationType, payload: NotificationPayload) {
    this.observers.forEach((observer) => observer.update(type, payload));
  }

  async findUserNotification(
    userId: string,
    limit: number,
    skip: number,
  ): Promise<DataResult<Notification[]>> {
    const query = this.notificationRepo
      .createQueryBuilder('notification')
      .where('notification.recipientId = :userId', { userId })
      .addSelect(
        `(
        SELECT COUNT(*) 
        FROM notification AS "unreadNotifications"
        WHERE "unreadNotifications"."recipientId" = :userId AND "unreadNotifications"."isRead" = false
      )`,
        'unreadCount',
      )
      .orderBy('notification.created_at', 'DESC')
      .skip(skip)
      .limit(limit);

    const data = await query.getMany();

    const unreadCount =
      (await query
        .getRawOne()
        .then((res) => parseInt(res.unreadCount || 0, 10))) || 0;

    return {
      data,
      meta: {
        unreadCount,
      },
    };
  }
}
