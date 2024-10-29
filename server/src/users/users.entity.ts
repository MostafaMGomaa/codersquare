import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntitiy } from 'abstract.entity';
import { Post } from 'src/posts/posts.entity';
import { Like } from 'src/likes/likes.entitiy';
import { Comment } from 'src/comments/comments.entity';
import { CommentLike } from 'src/comments-likes/comments-likes.entity';

@Entity({ name: 'users' })
export class User extends AbstractEntitiy {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column('text', { nullable: true })
  about: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Like, (like) => like.author)
  likes: Like[];

  @OneToMany(() => CommentLike, (commentLike) => commentLike.author)
  comment_likes: CommentLike[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
