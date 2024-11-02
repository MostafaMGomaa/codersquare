import { IAbstract } from '@codersquare/shared';
export interface CommentLike extends IAbstract {
  authorId: string;
  commentId: string;
}
export interface CreateCommentLikePayload {
  commentId: string;
  jwt: string;
}
export interface DislikeCommentPayload extends CreateCommentLikePayload {}
