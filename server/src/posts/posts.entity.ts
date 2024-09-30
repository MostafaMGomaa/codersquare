import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntitiy } from 'abstract.entity';
import { User } from 'src/users/users.entity';

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
}
