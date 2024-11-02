import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataResult } from '@codersquare/shared';
import { Comment } from './comments.entity';
import { CommentDto } from './dto';
import { paginate, PaginationDto } from 'src/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommnetsService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async create(data: CommentDto): Promise<CommentDto> {
    return this.commentRepo.save(data);
  }

  async findAllByPostId(
    postId: string,
    paginateData: PaginationDto,
    userId: string | null,
  ): Promise<DataResult<CommentDto[]>> {
    const { cursor, limit, strategy, orderType } = paginate(paginateData);

    let query = this.commentRepo
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.author', 'author')
      .where('d.postId = :postId', { postId })
      .loadRelationCountAndMap('d.likesCount', 'd.comment_likes')
      .leftJoin('d.comment_likes', 'comment_like')
      .addSelect(
        `CASE
          WHEN comment_like.authorId = :userId THEN true
          ELSE false
          END`,
        'd_likedByUserBefore',
      )
      .setParameter('userId', userId || null);

    strategy.applyCursor(query, cursor, orderType);

    const data = await query.take(limit).getMany();
    const nextCursor = strategy.getNextCursor(data);

    return {
      data,
      meta: {
        count: data.length,
        nextCursor,
      },
    };
  }

  async delete(id: string, authorId: string): Promise<boolean> {
    const dbComment = await this.commentRepo.findOneBy({ id, authorId });
    return (await this.commentRepo.delete(id)).affected === 1;
  }
}
