import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Like } from 'src/likes/likes.entitiy';
import { LikesService } from 'src/likes/likes.service';
import { LikesController } from 'src/likes/likes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
