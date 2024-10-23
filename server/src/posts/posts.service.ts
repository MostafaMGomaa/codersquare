import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { DataResult } from '@codersquare/shared';
import { Post } from './posts.entity';
import { PostDto, UpdatePostDto } from './dto';
import { paginate, PaginationDto } from 'src/common';

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

  async list(
    paginateData: PaginationDto,
    token?: string | null,
  ): Promise<DataResult<Post[]>> {
    const { strategy, cursor, limit, orderType } = paginate(paginateData);

    const query = this.postsRepo
      .createQueryBuilder('d')
      .leftJoinAndSelect('d.author', 'author')
      .loadRelationCountAndMap('d.commentCount', 'd.comments')
      .loadRelationCountAndMap('d.likeCount', 'd.likes');

    if (token) {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>('JWT_SECRET'),
      });

      let userId = payload.id;

      query
        .leftJoin('d.likes', 'like')
        .addSelect(
          `CASE
            WHEN like.authorId = :userId THEN true
            ELSE false
          END`,
          'd_likedByUserBefore',
        )
        .setParameter('userId', userId);
    }

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

  async findPostById(id: string, userId: string): Promise<Post> {
    const post = await this.postsRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .loadRelationCountAndMap('post.likeCount', 'post.likes')
      .where('post.id = :id', { id })
      .leftJoin('post.likes', 'like')
      .addSelect(
        `CASE
            WHEN like.authorId = :userId THEN true
            ELSE false
          END`,
        'post_likedByUserBefore',
      )
      .setParameter('userId', userId)
      .getOne();

    if (!post) throw new NotFoundException('cannot find this post');

    return post;
  }

  async findPostsByUserId(authorId: string): Promise<Post[]> {
    return this.postsRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .where('post.authorId = :authorId', { authorId })
      .getMany();
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
