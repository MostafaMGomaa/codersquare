import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntitiy } from 'abstract.entity';
import { User } from 'src/users/users.entity';
import { Post } from 'src/posts/posts.entity';
import { CommentLike } from 'src/comments-likes/comments-likes.entity';

@Entity('comments')
export class Comment extends AbstractEntitiy {
  @Column()
  comment: string;

  @Column()
  postId: string;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ManyToOne(() => CommentLike, (commentLike) => commentLike.comment)
  comment_likes: CommentLike[];

  @Column({ default: false })
  likedByUserBefore: boolean;
}
