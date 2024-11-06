import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from './comments.entity';
import { CommentsController } from './comments.controller';
import { CommnetsService } from './comments.service';
import { NotificationModule } from 'src/notifications/notification.module';
import { NotificationService } from 'src/notifications/services';
import { Post } from 'src/posts/posts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post]), NotificationModule],
  providers: [CommnetsService, NotificationService],
  controllers: [CommentsController],
})
export class CommentsModule {}
