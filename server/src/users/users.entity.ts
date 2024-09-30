import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntitiy } from 'abstract.entity';
import { Post } from 'src/posts/posts.entity';

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

  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
