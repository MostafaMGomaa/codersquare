export interface IAbstract {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Post extends IAbstract {
  title: string;
  url: string;
  authorId: string;
  author: User;
  comments?: Comment[];
  likes?: Like[];
  commentCount: number;
  likeCount: number;
  likedByUserBefore: boolean;
}

export interface User extends IAbstract {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  posts: Post[];
  likes: Like[];
  comments: Comment[];
}

export interface Comment extends IAbstract {
  comment: string;
  postId: string;
  post: Post;
  authorId: string;
  author: User;
  likeCount?: number;
}

export interface Like extends IAbstract {
  authorId: string;
  author: User;
  postId: string;
  post: Post;
}
