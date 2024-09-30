import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from 'src/users/users.service';
import { LoginDto, CreateUserDto, JwtDto } from './dto';

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
   * @returns {Promise<string>} - A JWT token if the login is successfully.
   * @throws {ForbiddenException} - If the email or password is invaild.
   */
  async login(data: LoginDto): Promise<string> {
    const { email, password } = data;
    const dbUser = await this.usersService.findOneByEmail(email);
    if (!dbUser) {
      throw new ForbiddenException('Invalid email or password');
    }

    const pwMatch = bcrypt.compareSync(password, dbUser.password);
    if (!pwMatch) {
      throw new ForbiddenException('Invalid email or password');
    }

    const jwt = await this.generateToken({
      id: dbUser.id,
      email: dbUser.email,
    });

    return jwt;
  }

  /**
   * Create new User.
   *
   * @async
   * @param data - Required user data to create an account.
   * @returns {Promise<string>} - Return A JWT Token.
   */
  async singup(data: CreateUserDto): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      data.password,
      Number(this.config.get<string>('SALT_ROUND')),
    );

    data.password = hashedPassword;

    const user = await this.usersService.create(data);

    return this.generateToken({
      id: user.id,
      email: user.email,
    });
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
    };

    return await this.jwt.signAsync(payload, {
      expiresIn: '8h',
      secret: this.config.get<string>('JWT_SECRET'),
    });
  }
}
