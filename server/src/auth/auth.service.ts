import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from 'src/users/users.service';
import { LoginDto, CreateUserDto, JwtDto } from './dto';
import { LoginResponse, SignupResponse } from '@codersquare/shared';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  /**
   * Login a user with provided credentials.
   *
   * @async
   * @param {LoginDto} data  - The login data containing email and password.
   * @returns {Promise<LoginResponse>} - A JWT token and the user data if the login is successfully.
   * @throws {ForbiddenException} - If the email or password is invaild.
   */
  async login(data: LoginDto): Promise<LoginResponse> {
    const { email, password } = data;
    const dbUser = await this.usersService.findOneByEmailOrUsername(email);
    if (!dbUser) {
      throw new ForbiddenException('Invalid email or password');
    }

    const pwMatch = bcrypt.compareSync(password, dbUser.password);
    if (!pwMatch) {
      throw new ForbiddenException('Invalid email or password');
    }

    const token = await this.generateToken({
      id: dbUser.id,
      email: dbUser.email,
      username: dbUser.username,
    });

    return { data: { token, user: dbUser } };
  }

  /**
   * Create new User.
   *
   * @async
   * @param data - Required user data to create an account.
   * @returns {Promise<SignupResponse>} - Return A JWT Token and new user data.
   */
  async singup(data: CreateUserDto): Promise<SignupResponse> {
    const hashedPassword = await bcrypt.hash(
      data.password,
      Number(this.config.get<string>('SALT_ROUND')),
    );

    data.password = hashedPassword;

    const user = await this.usersService.create(data);

    const token = await this.generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return { data: { token, user } };
  }

  /**
   * Generate a JWT token for provided user data.
   *
   * @async
   * @param {JwtDto} data - The user data include in the JWT payload.
   * @returns{Promise<string>} -The generated JWT token.
   */
  async generateToken(data: JwtDto): Promise<string> {
    const payload = {
      id: data.id,
      email: data.email,
      username: data.username,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '90d',
      secret: this.config.get<string>('JWT_SECRET'),
    });
  }
}
