import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { PostDto, PostFeed, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepo: Repository<Post>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async create(data: PostDto): Promise<Post> {
    const post = this.postsRepo.create({
      title: data.title,
      url: data.url,
      authorId: data.authorId,
    });

    return this.postsRepo.save(post);
  }

  async findPostById(id: string): Promise<Post> {
    return this.postsRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .where('post.id = :id', { id })
      .select([
        'post.id',
        'post.title',
        'post.url',
        'post.createdAt',
        'author.id',
        'author.firstName',
        'author.lastName',
        'author.email',
      ])
      .getOne();
  }

  async findPostsByUserId(authorId: string): Promise<Post[]> {
    return this.postsRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .where('post.authorId = :authorId', { authorId })
      .getMany();
  }

  async list(token?: string | null): Promise<any> {
    const query = this.postsRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .loadRelationCountAndMap('post.likeCount', 'post.likes');

    if (token) {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>('JWT_SECRET'),
      });

      let userId = payload.id;

      query
        .leftJoin('post.likes', 'like')
        .addSelect(
          `CASE
            WHEN like.authorId = :userId THEN true
            ELSE false
          END`,
          'post_likedByUserBefore',
        )
        .setParameter('userId', userId);
    }

    return query.orderBy('post.createdAt', 'DESC').getMany();
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
