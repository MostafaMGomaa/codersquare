import { Controller, Get, Req, UseFilters, UseGuards } from '@nestjs/common';
import { NotificationService } from './services';
import { AuthGuard } from 'src/auth/auth.guard';
import { TypeormExceptionFilter } from 'src/common';

@Controller('notifications')
@UseGuards(AuthGuard)
@UseFilters(TypeormExceptionFilter)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/')
  findByUseId(@Req() req) {
    return this.notificationService.findUserNotification(
      req.user.id,
      req.query.limit,
      req.query.skip,
    );
  }
}
