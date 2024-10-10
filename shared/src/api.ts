import { Like, Post } from './types';

export interface SignupResponse {
  data: {
    token: string;
  };
}

export interface LoginResponse extends SignupResponse {}

export interface CreateLikeResponse extends Like {}

export interface CreatePostResponse extends Post {}
