import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CommnetsService } from './comments.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCommentBody } from './dto';
import { PaginationDto, TypeormExceptionFilter } from 'src/common';

@Controller('comments')
@UseFilters(TypeormExceptionFilter)
@UseGuards(AuthGuard)
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
  getAllByPostId(
    @Param('postId') postId: string,
    @Query() query: PaginationDto,
  ) {
    return this.commentsService.findAllByPostId(postId, query);
  }

  @Delete('/:id')
  delete(@Param('id') id: string, @Req() req) {
    return this.commentsService.delete(id, req.user.id);
  }
}
