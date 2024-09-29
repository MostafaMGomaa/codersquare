import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({
      global: true,
    }),
    ConfigModule,
  ],
  providers: [UsersService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
