import { Exclude } from 'class-transformer';

export class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  about: string;
  @Exclude()
  password: string;
  created_at?: Date;
}
