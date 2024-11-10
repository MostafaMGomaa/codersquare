export interface NotificationProps {}

export interface NotificationEvent {
  recipientId: string;
  message: string;
  postId: string;
  type: string;
}
