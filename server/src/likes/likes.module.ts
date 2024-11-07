import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Like } from 'src/likes/likes.entitiy';
import { LikesService } from 'src/likes/likes.service';
import { LikesController } from 'src/likes/likes.controller';
import { Post } from 'src/posts/posts.entity';
import { NotificationModule } from 'src/notifications/notification.module';
import { NotificationService } from 'src/notifications/services';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Post]), NotificationModule],
  providers: [LikesService, NotificationService],
  controllers: [LikesController],
})
export class LikesModule {}
