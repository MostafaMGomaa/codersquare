import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { PostsService } from './posts.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePostDto } from './dto';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('')
  @UseGuards(AuthGuard)
  async getUserPosts(@Req() req) {
    return await this.postsService.findPostsByUserId(req.user.id);
  }

  @Post('')
  @UseGuards(AuthGuard)
  async create(@Body() data: CreatePostDto, @Req() req) {
    return await this.postsService.create({
      title: data.title,
      url: data.url,
      authorId: req.user.id,
    });
  }
}
