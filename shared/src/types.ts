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
  comment_likes: CommentLike[];
  comments: Comment[];
  username: string;
  about: string;
  notifications: Notification[];
  sentNotifications: Notification[];
}

export interface Comment extends IAbstract {
  comment: string;
  postId: string;
  post: Post;
  authorId: string;
  author: User;
  likesCount?: number;
  likedByUserBefore: boolean;
}

export interface Like extends IAbstract {
  authorId: string;
  author: User;
  postId: string;
  post: Post;
}
export interface CommentLike extends IAbstract {
  commentId: string;
  comment: Comment;
  authorId: string;
  author: User;
}
export interface Notification extends IAbstract {
  recipientId: string;
  recipient: User;
  userId: string;
  user: User;
  type: string;
  message: string;
  postId: string;
  commentId: string;
  isRead: boolean;
}
