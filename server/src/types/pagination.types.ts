import { PaginationStrategy } from 'src/common/pagination/stragies';

export interface PaginateResult {
  limit: number;
  cursor: string | null;
  strategy: PaginationStrategy;
  orderType?: OrderType;
}

export enum CursorField {
  createdAt = 'createdAt',
  id = 'id',
  points = 'points',
}

export enum OrderType {
  desc = 'DESC',
  asc = 'ASC',
}
