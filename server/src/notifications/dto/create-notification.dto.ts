import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { NotificationType } from '../enums';

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

  @IsNotEmpty()
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsDate()
  createdAt: Date;
}
