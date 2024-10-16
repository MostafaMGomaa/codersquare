export interface CreateLikePayload {
  postId: string;
  jwt: string;
}

export interface DeleteLikePayload extends CreateLikePayload {}
