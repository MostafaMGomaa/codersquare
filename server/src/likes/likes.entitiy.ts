import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntitiy } from 'abstract.entity';
import { Post } from 'src/posts/posts.entity';
import { User } from 'src/users/users.entity';

@Entity('likes')
@Index(['authorId', 'postId'], { unique: true })
export class Like extends AbstractEntitiy {
  @Column()
  authorId: string;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @Column()
  postId: string;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn({ name: 'postId' })
  post: Post;
}
