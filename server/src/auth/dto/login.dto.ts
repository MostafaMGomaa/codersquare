import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  email: string;

  @MinLength(8, {
    message: 'Password must at least 8 chars',
  })
  password: string;
}
