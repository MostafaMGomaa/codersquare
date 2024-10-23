import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserDto } from './dto';
import { CreateUserDto } from 'src/auth/dto';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  /**
   * Creates a new user with the provided data.
   *
   * @async
   * @param {CreateUserDto} data - The data for creating a new user.
   * @returns {Promise<any>} - A promise that resolves when the user is created.
   * @throws {ConflictException} - If a user with the same email already exists.
   */
  async create(data: CreateUserDto): Promise<UserDto> {
    const dbUser = await this.usersRepo.findOne({
      where: { email: data.email },
    });
    if (dbUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const user = this.usersRepo.create(data);

    return await this.usersRepo.save(user);
  }

  /**
   * Get all users in the DB.
   *
   * @async
   * @returns All Users in the DB.
   */
  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepo.find();
    const transformedUsers = plainToInstance(UserDto, users);
    return transformedUsers;
  }

  /**
   * Get the user by Id
   *
   * @async
   * @param {string}id - The User id.
   * @returns {Promise<User>} - A user with that ID.
   */
  async findOneById(id: string): Promise<UserDto> {
    return await this.usersRepo.findOneBy({
      id,
    });
  }

  /**
   * Get the user by email
   *
   * @async
   * @param {string}email - The User email.
   * @returns {Promise<User>} - A user with that email.
   */

  async findOneByEmailOrUsername(email: string): Promise<User> {
    return await this.usersRepo.findOne({
      where: [{ email }, { username: email }],
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'password',
        'createdAt',
        'about',
        'username',
      ],
    });
  }
}
