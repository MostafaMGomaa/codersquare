import { Module } from '@nestjs/common';
import { CommentLikesController } from './comments-likes.controller';
import { CommentLikesService } from './comments-likes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLike } from './comments-likes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentLike])],
  providers: [CommentLikesService],
  controllers: [CommentLikesController],
})
export class CommentLikesModule {}
