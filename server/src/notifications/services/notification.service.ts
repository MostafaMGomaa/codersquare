import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { Observer } from '../interfaces';
import { NotificationType } from '../enums';
import { NotificationPayload } from '../dto';
import { PostNotificationService } from './post-notification.service';
import { CommentNotificationService } from './comment-notification.service';

@Injectable()
export class NotificationService implements OnApplicationBootstrap {
  private observers: Observer[] = [];

  constructor(
    private postNotificationService: PostNotificationService,
    private commentNotificationService: CommentNotificationService,
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
}
