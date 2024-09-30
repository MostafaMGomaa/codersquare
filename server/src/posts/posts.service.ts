import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { PostDto, UpdatePostDto } from './dto';

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

  async findPostById(id: string): Promise<Post> {
    return this.postsRepo.findOneBy({ id });
  }

  async findPostsByUserId(authorId: string): Promise<Post[]> {
    return this.postsRepo.findBy({ authorId });
  }

  async updatePostByPostIdAndUserId(
    postId: string,
    authorId: string,
    data: Partial<UpdatePostDto>,
  ): Promise<string> {
    const dbPost = await this.postsRepo.findOneBy({ id: postId, authorId });

    if (!dbPost) {
      throw new NotFoundException();
    }

    await this.postsRepo.update({ id: postId }, data);
    return 'Post updated successfully';
  }

  async delete(postId: string, authorId: string): Promise<string> {
    await this.postsRepo.delete({
      id: postId,
      authorId,
    });

    return 'Post deleted successfully';
  }
}
