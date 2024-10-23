import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataResult } from '@codersquare/shared';
import { Comment } from './comments.entity';
import { CommentDto } from './dto';
import { paginate, PaginationDto } from 'src/common';

@Injectable()
export class CommnetsService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async create(data: CommentDto): Promise<CommentDto> {
    return this.commentRepo.save(data);
  }

  async findAllByPostId(
    postId: string,
    paginateData: PaginationDto,
  ): Promise<DataResult<CommentDto[]>> {
    const { cursor, limit, strategy, orderType } = paginate(paginateData);

    let query = this.commentRepo
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.author', 'author')
      .where('d.postId = :postId', { postId })
      .select([
        'd.id',
        'd.comment',
        'd.createdAt',
        'author.id',
        'author.firstName',
        'author.lastName',
        'author.email',
        'author.username',
      ]);

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
