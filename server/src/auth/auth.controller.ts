import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private auhtService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async singup(@Body() data: CreateUserDto) {
    const token = await this.auhtService.singup(data);
    return { data: { token } };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() data: LoginDto) {
    const token = await this.auhtService.login(data);
    return { data: { token } };
  }
}
