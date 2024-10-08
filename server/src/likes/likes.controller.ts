import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';

import { LikesService } from './likes.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @UseGuards(AuthGuard)
  @Post('/:postId')
  async create(@Req() req, @Param('postId') postId: string) {
    return this.likesService.create({
      postId,
      authorId: req.user.id,
    });
  }
}
