import { NotificationPayload } from '../dto';
import { NotificationType } from '../enums';

export interface Observer {
  update(type: NotificationType, paylaod: NotificationPayload): void;
}
