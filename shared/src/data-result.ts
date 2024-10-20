export interface DataResult<T> {
  data: T[] | T | string;
  meta?: {
    count: number;
    nextCursor: string | null;
  };
}
