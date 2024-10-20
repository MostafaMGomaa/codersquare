import { SelectQueryBuilder } from 'typeorm';
import { Comment } from 'src/comments/comments.entity';
import { Post } from 'src/posts/posts.entity';
import { OrderType } from 'src/types';

export interface PaginationStrategy {
  applyCursor(
    query: SelectQueryBuilder<Post | Comment>,
    cursor: string,
    orderType: OrderType,
  ): void;
  getNextCursor(data: Post[] | Comment[]): string | null;
}
