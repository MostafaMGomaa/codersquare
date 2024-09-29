import { IsEmail, Min, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @MinLength(8, {
    message: 'Password must at least 8 chars',
  })
  password: string;
}
