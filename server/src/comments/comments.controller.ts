import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommnetsService } from './comments.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCommentBody } from './dto';

@UseGuards(AuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommnetsService) {}

  @Post('/:postId')
  create(
    @Body() bodyData: CreateCommentBody,
    @Param('postId') postId: string,
    @Req() req,
  ) {
    return this.commentsService.create({
      authorId: req.user.id,
      comment: bodyData.comment,
      postId,
    });
  }

  @Get('/:postId')
  getAllByPostId(@Param('postId') postId: string) {
    return this.commentsService.findAllByPostId(postId);
  }

  @Delete('/:id')
  delete(@Param('id') id: string, @Req() req) {
    return this.commentsService.delete(id, req.user.id);
  }
}
