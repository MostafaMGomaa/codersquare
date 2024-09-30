import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getOneUser(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }
}
