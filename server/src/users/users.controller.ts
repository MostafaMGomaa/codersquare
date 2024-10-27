import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/me')
  async getMe(@Req() req) {
    return this.userService.findOneById(req.user.id);
  }

  @Patch('/me')
  async updateMe(@Req() req, @Body() data: UpdateUserDto) {
    const message = await this.userService.updateById(req.user.id, data);
    return { message };
  }
}
