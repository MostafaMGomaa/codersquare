export interface ListPostCommentsPayload {
  postId: string;
  jwt: string;
}

export interface CreateCommentPayload {
  comment: string;
  jwt: string;
  postId: string;
}
