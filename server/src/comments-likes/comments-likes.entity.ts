import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';

import { AbstractEntitiy } from 'abstract.entity';
import { Comment } from 'src/comments/comments.entity';
import { User } from 'src/users/users.entity';

@Entity('comment_likes')
@Index(['authorId', 'commentId'], { unique: true })
export class CommentLike extends AbstractEntitiy {
  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.comment_likes)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column()
  commentId: string;

  @ManyToOne(() => Comment, (comment) => comment.comment_likes)
  @JoinColumn({ name: 'commentId' })
  comment: Comment;
}
