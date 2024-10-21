export interface CreatePostPayload {
  title: string;
  url: string;
  authorId?: string;
  jwt?: string;
}

export interface ViewPostPayload {
  jwt: string;
  id: string;
}

export interface GetAllPostsPayload {
  limit: number;
  cursor: string | undefined;
  cursorField: string | undefined;
  jwt: string;
}
