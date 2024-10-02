import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments.entity';
import { CommentsController } from './comments.controller';
import { CommnetsService } from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommnetsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
