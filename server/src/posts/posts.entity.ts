import { Column, ManyToOne } from 'typeorm';
import { AbstractEntitiy } from 'abstract.entity';
import { User } from 'src/users/users.entity';

export class Post extends AbstractEntitiy {
  @Column()
  title: string;

  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
