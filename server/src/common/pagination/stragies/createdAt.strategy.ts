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
    if (cursor) {
      cursor = new Date(cursor);
      query.andWhere(
        `d.createdAt ${orderType === OrderType.desc ? '<' : '>'} :cursor`,
        { cursor },
      );
    }

    query.orderBy(`d.createdAt`, orderType);
  }

  getNextCursor(data: Post[] | Comment[], limit: number): string | null {
    if (data.length === limit + 1) {
      return data[data.length - 2].createdAt.toISOString();
    }

    return null;
  }
}
