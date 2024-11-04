import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Post } from 'src/posts/posts.entity';
import { User } from 'src/users/users.entity';
import { Like } from 'src/likes/likes.entitiy';
import { Comment } from 'src/comments/comments.entity';
import { CommentLike } from 'src/comments-likes/comments-likes.entity';
import { Notification } from 'src/notifications/entities';

export const getTypeOrmConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get<string>('DATABASE_HOST'),
  port: 5432,
  username: config.get<string>('DATABASE_USERNAME'),
  password: config.get<string>('DATABASE_PASSWORD'),
  database: config.get<string>('DATABASE_NAME'),
  entities: [User, Post, Like, Comment, CommentLike, Notification],
  synchronize: config.get<string>('NODE_ENV') === 'development',
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
});
