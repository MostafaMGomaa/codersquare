import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Like } from './likes.entitiy';
import { LikeDto } from './dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class LikesService {
  constructor(@InjectRepository(Like) private likeRepo: Repository<Like>) {}

  async create(data: LikeDto) {
    return this.likeRepo.save(data);
  }

  async deleteById(postId: string, authorId: string) {
    const result = await this.likeRepo.delete({ postId, authorId });

    if (result.affected === 0) {
      throw new NotFoundException('Cannot dislike this post');
    }

    return { data: { message: 'Like deleted successfully' } };
  }
}
