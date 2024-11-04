import { AbstractEntitiy } from 'abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('notification')
export class Notification extends AbstractEntitiy {
  @Column()
  recipientId: string;

  @Column()
  userId: string;

  @Column()
  type: string;

  @Column()
  message: string;

  @Column({ nullable: true })
  postId: string;

  @Column({ nullable: true })
  commentId: string;

  @Column({ default: false })
  isRead: boolean;
}
