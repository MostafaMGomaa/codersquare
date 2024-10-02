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
    return this.commentRepo.findBy({ postId });
  }

  async delete(id: string, authorId: string): Promise<boolean> {
    const dbComment = await this.commentRepo.findOneBy({ id, authorId });
    return (await this.commentRepo.delete(id)).affected === 1;
  }
}
