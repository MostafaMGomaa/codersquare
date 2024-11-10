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
  ): Promise<DataResult<Notification[]>> {
    const data = await this.notificationRepo
      .createQueryBuilder('notification')
      .where('notification.recipientId=:userId', { userId })
      .orderBy('created_at', 'DESC')
      .limit(5)
      .getMany();

    return { data };
  }
}
