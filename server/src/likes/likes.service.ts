import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Like } from './likes.entitiy';
import { LikeDto } from './dto';
import { NotificationService } from 'src/notifications/services';
import { Post } from 'src/posts/posts.entity';
import { NotificationType } from 'src/notifications/enums';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likeRepo: Repository<Like>,
    @InjectRepository(Post) private postRepo: Repository<Post>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(data: LikeDto) {
    // Notify the post author (if the post.authorId != like.postId)
    const newPostLike = await this.likeRepo.save(data);
    const post = await this.postRepo
      .createQueryBuilder('post')
      .where('id = :postId', { postId: newPostLike.postId })
      .leftJoin('post.author', 'author')
      .select(['post.authorId', 'post.id', 'author.username'])
      .getOne();

    if (!post) {
      throw new NotFoundException('Cannot find this post');
    }

    if (post.authorId !== newPostLike.authorId) {
      this.notificationService.notify(NotificationType.NEW_LIKE_ON_POST, {
        message: `${newPostLike.author.username} add new like on your post`,
        recipientId: post.authorId,
        type: NotificationType.NEW_LIKE_ON_POST,
        userId: newPostLike.authorId,
        postId: post.id,
      });
    }

    return newPostLike;
  }

  async deleteById(postId: string, authorId: string) {
    const result = await this.likeRepo.delete({ postId, authorId });

    if (result.affected === 0) {
      throw new NotFoundException('Cannot dislike this post');
    }

    return { data: { message: 'Like deleted successfully' } };
  }
}
