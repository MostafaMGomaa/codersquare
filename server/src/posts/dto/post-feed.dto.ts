import { Post } from '../posts.entity';

export interface PostFeed extends Post {
  commentCount: number;
  likeCount: number;
}
