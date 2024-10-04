import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntitiy } from 'abstract.entity';
import { User } from 'src/users/users.entity';
import { Like } from 'src/likes/likes.entitiy';
import { Comment } from 'src/comments/comments.entity';

@Entity('posts')
export class Post extends AbstractEntitiy {
  @Column({ nullable: false })
  title: string;

  @Column()
  url: string;

  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
