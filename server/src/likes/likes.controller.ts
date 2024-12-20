import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { LikesService } from './likes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TypeormExceptionFilter } from 'src/common';

@Controller('likes')
@UseFilters(TypeormExceptionFilter)
@UseGuards(AuthGuard)
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post('/:postId')
  async create(@Req() req, @Param('postId') postId: string) {
    return this.likesService.create({
      postId,
      authorId: req.user.id,
    });
  }

  @Delete('/:postId')
  async delete(@Req() req, @Param('postId') postId: string) {
    return this.likesService.deleteById(postId, req.user.id);
  }
}
