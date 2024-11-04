import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class NotificationPayload {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsUUID()
  postId?: string;

  @IsOptional()
  @IsUUID()
  commentId?: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
