import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LikesService } from './likes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateLikeDto } from './dto';

@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @UseGuards(AuthGuard)
  @Post('')
  async create(@Body() data: CreateLikeDto, @Req() req) {
    return this.likesService.create({
      postId: data.postId,
      authorId: req.user.id,
    });
  }
}
