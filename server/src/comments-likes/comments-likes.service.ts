import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentLike } from './comments-likes.entity';
import { CommentLikeDto } from './dto';
import { DataResult } from '@codersquare/shared';
import { NotificationService } from 'src/notifications/services';
import { NotificationType } from 'src/notifications/enums';
import { Comment } from 'src/comments/comments.entity';

@Injectable()
export class CommentLikesService {
  constructor(
    @InjectRepository(CommentLike)
    private commentLikeRepo: Repository<CommentLike>,
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(data: CommentLikeDto): Promise<DataResult<CommentLike>> {
    const newCommentLike = await this.commentLikeRepo
      .createQueryBuilder()
      .insert()
      .into(CommentLike)
      .values(data)
      .returning('*')
      .execute()
      .then((result) =>
        this.commentLikeRepo
          .createQueryBuilder('commentLike')
          .leftJoinAndSelect('commentLike.author', 'author')
          .where('commentLike.id = :id', { id: result.raw[0].id })
          .getOne(),
      );

    // Notify the comment author (if the commentLike.authorId != commentLike.commentId)
    const comment = await this.commentRepo
      .createQueryBuilder('comment')
      .where('comment.id = :commentId', {
        commentId: newCommentLike.commentId,
      })
      .leftJoin('comment.author', 'author')
      .select(['comment.postId', 'comment.authorId', 'author.username'])
      .getOne();

    if (!comment) {
      throw new NotFoundException('Cannot find this comment');
    }

    if (newCommentLike.authorId != comment.authorId) {
      // Notify the post author in case he didn't the new comment like author.
      this.notificationService.notify(NotificationType.NEW_LIKE_ON_COMMENT, {
        userId: newCommentLike.authorId,
        recipientId: comment.authorId,
        message: `${newCommentLike.author.username} add new like on your comment`,
        type: NotificationType.NEW_LIKE_ON_COMMENT,
        commentId: newCommentLike.commentId,
        postId: comment.postId,
        createdAt: newCommentLike.createdAt,
      });
    }

    return { data: newCommentLike };
  }

  async deleteById(commentId: string, authorId: string) {
    const result = await this.commentLikeRepo.delete({ commentId, authorId });

    if (result.affected === 0) {
      throw new NotFoundException('Cannot dislike this comment');
    }

    return { data: { message: 'Like deleted successfully' } };
  }
}
