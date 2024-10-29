import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentLike } from './comments-likes.entity';
import { CommentLikeDto } from './dto';

@Injectable()
export class CommentLikesService {
  constructor(
    @InjectRepository(CommentLike)
    private commentLikeRepo: Repository<CommentLike>,
  ) {}

  async create(data: CommentLikeDto) {
    await this.commentLikeRepo
      .createQueryBuilder()
      .insert()
      .into(CommentLike)
      .values(data)
      .execute();

    return { data: { message: 'Comment liked successfully' } };
  }

  async deleteById(commentId: string, authorId: string) {
    const result = await this.commentLikeRepo.delete({ commentId, authorId });

    if (result.affected === 0) {
      throw new NotFoundException('Cannot dislike this comment');
    }

    return { data: { message: 'Like deleted successfully' } };
  }
}
