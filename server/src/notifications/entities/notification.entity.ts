import { AbstractEntitiy } from 'abstract.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('notification')
export class Notification extends AbstractEntitiy {
  @Column()
  recipientId: string;
  @ManyToOne(() => User, (user) => user.sentNotifications)
  @JoinColumn({ name: 'recipientId' })
  recipient: User;

  /** The user who make the event */
  @Column()
  userId: string;
  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'userId' })
  user: User;

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
