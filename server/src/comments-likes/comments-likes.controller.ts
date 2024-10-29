import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import { CommentLikesService } from './comments-likes.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TypeormExceptionFilter } from 'src/common';

@Controller('comments/:commentId/like')
@UseFilters(TypeormExceptionFilter)
@UseGuards(AuthGuard)
export class CommentLikesController {
  constructor(private commentLikesService: CommentLikesService) {}

  @Post('')
  async likeComment(@Param('commentId') commentId: string, @Req() req) {
    return await this.commentLikesService.create({
      authorId: req.user.id,
      commentId,
    });
  }

  @Delete('')
  async unlikeComment(@Param('commentId') commentId: string, @Req() req) {
    return await this.commentLikesService.deleteById(commentId, req.user.id);
  }
}
