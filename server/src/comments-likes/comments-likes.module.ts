import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentLikesController } from './comments-likes.controller';
import { CommentLikesService } from './comments-likes.service';
import { CommentLike } from './comments-likes.entity';
import { NotificationService } from 'src/notifications/services';
import { NotificationModule } from 'src/notifications/notification.module';
import { Comment } from 'src/comments/comments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentLike, Comment]),
    NotificationModule,
  ],
  providers: [
    CommentLikesService,
    // NotificationService
  ],
  controllers: [CommentLikesController],
})
export class CommentLikesModule {}
