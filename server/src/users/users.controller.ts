import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getOneUser(@Param('id') id: string) {
    return await this.userService.findOneById(id);
  }
}
