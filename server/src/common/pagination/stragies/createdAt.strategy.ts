import { Post } from 'src/posts/posts.entity';
import { PaginationStrategy } from './pagination-strategy.interface';
import { Comment } from 'src/comments/comments.entity';
import { OrderType } from 'src/types';
import { SelectQueryBuilder } from 'typeorm';

export class CreatedAtStrategy implements PaginationStrategy {
  applyCursor(
    query: SelectQueryBuilder<Post | Comment>,
    cursor: string | Date = new Date().toISOString(),
    orderType: OrderType = OrderType.desc,
  ): void {
    if (!cursor) cursor = new Date();

    query
      .andWhere('post.createdAt <= :cursor', { cursor })
      .orderBy(`post.createdAt`, orderType);
  }

  getNextCursor(data: Post[] | Comment[]): string | null {
    return data.length > 0
      ? data[data.length - 1].createdAt.toISOString()
      : null;
  }
}
