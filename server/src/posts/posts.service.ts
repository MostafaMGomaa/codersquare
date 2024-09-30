import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { PostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postsRepo: Repository<Post>) {}

  async create(data: PostDto): Promise<Post> {
    const post = this.postsRepo.create({
      title: data.title,
      url: data.url,
      authorId: data.authorId,
    });

    return this.postsRepo.save(post);
  }

  async findPostsByUserId(authorId: string): Promise<Post[]> {
    return this.postsRepo.findBy({ authorId });
  }
}
