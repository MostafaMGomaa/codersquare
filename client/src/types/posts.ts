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
