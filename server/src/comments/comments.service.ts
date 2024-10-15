import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Comment } from './comments.entity';
import { CommentDto } from './dto';

@Injectable()
export class CommnetsService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
  ) {}

  async create(data: CommentDto): Promise<CommentDto> {
    return this.commentRepo.save(data);
  }

  async findAllByPostId(postId: string): Promise<CommentDto[]> {
    return this.commentRepo
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author')
      .where('comment.postId = :postId', { postId })
      .select([
        'comment.id',
        'comment.comment',
        'comment.createdAt',
        'author.id',
        'author.firstName',
        'author.lastName',
        'author.email',
      ])
      .orderBy('comment.created_at', 'DESC')
      .getMany();
  }

  async delete(id: string, authorId: string): Promise<boolean> {
    const dbComment = await this.commentRepo.findOneBy({ id, authorId });
    return (await this.commentRepo.delete(id)).affected === 1;
  }
}
