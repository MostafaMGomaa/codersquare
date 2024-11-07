import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataResult } from '@codersquare/shared';
import { Comment } from './comments.entity';
import { CommentDto } from './dto';
import { paginate, PaginationDto } from 'src/common';
import { NotificationService } from 'src/notifications/services';
import { NotificationType } from 'src/notifications/enums';
import { Post } from 'src/posts/posts.entity';

@Injectable()
export class CommnetsService {
  constructor(
    @InjectRepository(Comment) private commentRepo: Repository<Comment>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(data: CommentDto): Promise<CommentDto> {
    const post = await this.postRepo
      .createQueryBuilder('post')
      .where('post.id = :postId')
      .setParameter('postId', data.postId)
      .leftJoinAndSelect('post.author', 'author')
      .select(['post.id', 'post.authorId', 'author.username'])
      .getOne();

    if (!post) {
      throw new NotFoundException('Cannot find this post');
    }

    const newComment = await this.commentRepo.save(data);

    // Notify the post author in case he didn't the new comment author.
    if (newComment.authorId !== post.authorId) {
      this.notificationService.notify(NotificationType.NEW_COMMENT, {
        message: `${post.author.username} add a new comment on your post`,
        recipientId: post.authorId,
        userId: data.authorId,
        commentId: newComment.id,
        postId: post.id,
        type: NotificationType.NEW_COMMENT,
      });
    }

    return newComment;
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
