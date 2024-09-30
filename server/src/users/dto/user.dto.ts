import { Exclude } from 'class-transformer';

export class UserDto {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  @Exclude()
  password: string;
}
