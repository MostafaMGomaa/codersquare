import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Like } from './likes.entitiy';
import { LikeDto } from './dto';

@Injectable()
export class LikesService {
  constructor(@InjectRepository(Like) private likeRepo: Repository<Like>) {}

  async create(data: LikeDto) {
    return this.likeRepo.save(data);
  }
}
