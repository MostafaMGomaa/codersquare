import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { Post } from './posts.entity';
import { PostsController } from './posts.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), ConfigModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
