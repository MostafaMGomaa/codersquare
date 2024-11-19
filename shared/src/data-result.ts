export interface DataResult<T> {
  data: T[] | T;
  meta?: {
    count: number;
    nextCursor: string | null;
  };
}
