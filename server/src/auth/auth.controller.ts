import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto';
import { TypeormExceptionFilter } from 'src/common';

@Controller('auth')
@UseFilters(TypeormExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async singup(@Body() data: CreateUserDto) {
    const response = await this.authService.singup(data);
    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() data: LoginDto) {
    const response = await this.authService.login(data);
    return response;
  }
}
