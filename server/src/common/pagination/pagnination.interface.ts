export interface PaginationResult<T> {
  data: T[] | T | string;
  meta: {
    nextCursor: string | null;
  };
}
