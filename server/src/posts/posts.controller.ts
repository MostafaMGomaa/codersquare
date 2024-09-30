import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { PostsService } from './posts.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePostDto, UpdatePostDto } from './dto';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('')
  async getUserPosts(@Req() req) {
    return await this.postsService.findPostsByUserId(req.user.id);
  }

  @Get('/feed')
  async getFeed() {
    return this.postsService.list();
  }

  @Get('/:id')
  async getOnePostById(@Param('id') id: string) {
    return this.postsService.findPostById(id);
  }

  @Post('')
  async create(@Body() data: CreatePostDto, @Req() req) {
    return await this.postsService.create({
      title: data.title,
      url: data.url,
      authorId: req.user.id,
    });
  }

  @Patch(':id')
  async updateUserPost(
    @Param('id') postId: string,
    @Body() data: UpdatePostDto,
    @Req() req,
  ) {
    const message = await this.postsService.updatePostByPostIdAndUserId(
      postId,
      req.user.id,
      data,
    );

    return { data: { message } };
  }

  @Delete(':id')
  async deletePostById(@Param('id') postId: string, @Req() req): Promise<any> {
    const message = await this.postsService.delete(postId, req.user.id);
    return { data: { message } };
  }
}
