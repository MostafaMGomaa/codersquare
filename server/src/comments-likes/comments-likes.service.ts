import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentLike } from './comments-likes.entity';
import { CommentLikeDto } from './dto';
import { DataResult } from '@codersquare/shared';

@Injectable()
export class CommentLikesService {
  constructor(
    @InjectRepository(CommentLike)
    private commentLikeRepo: Repository<CommentLike>,
  ) {}

  async create(data: CommentLikeDto): Promise<DataResult<CommentLike>> {
    const result = await this.commentLikeRepo
      .createQueryBuilder()
      .insert()
      .into(CommentLike)
      .values(data)
      .returning('*')
      .execute();

    return { data: result.raw[0] };
  }

  async deleteById(commentId: string, authorId: string) {
    const result = await this.commentLikeRepo.delete({ commentId, authorId });

    if (result.affected === 0) {
      throw new NotFoundException('Cannot dislike this comment');
    }

    return { data: { message: 'Like deleted successfully' } };
  }
}
