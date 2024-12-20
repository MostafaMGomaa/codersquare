export interface ListPostCommentsPayload {
  postId: string;
  jwt: string;
  limit: number;
  cursor: string | undefined;
  cursorField: string | undefined;
}

export interface CreateCommentPayload {
  comment: string;
  jwt: string;
  postId: string;
}

export interface UpdateNotificationsPayload {
  ids: string[];
  jwt: string;
}
export interface UpdateNotificationsResponse {
  message: string;
}
