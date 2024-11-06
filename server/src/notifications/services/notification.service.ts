import { Injectable } from '@nestjs/common';

import { Observer } from '../interfaces';
import { NotificationType } from '../enums';
import { NotificationPayload } from '../dto';

@Injectable()
export class NotificationService {
  private observers: Observer[] = [];

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs != obs);
  }

  notify(type: NotificationType, payload: NotificationPayload) {
    this.observers.forEach((observer) => observer.update(type, payload));
  }
}
