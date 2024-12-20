import { Like, Post, User } from './types';

export interface SignupResponse {
  data: {
    token: string;
    user: Partial<User>;
  };
}

export interface LoginResponse extends SignupResponse {}

export interface CreateLikeResponse extends Like {}

export interface CreatePostResponse extends Post {}

export interface CreateCommentResponse extends Comment {}

export interface GetMeResponse extends User {}

export interface DeleteLikeResponse {
  data: {
    message: string;
  };
}
