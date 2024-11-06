import { NotificationPayload } from '../dto';
import { NotificationType } from '../enums';

export interface Observer {
  update(type: NotificationType, payload: NotificationPayload): void;
}
