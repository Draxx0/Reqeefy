import { Controller, Delete, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Put(':id')
  async readNotification(@Param('id') id: string) {
    return await this.notificationsService.read(id);
  }

  @Put('/users/:id')
  async readAllUserNotifications(@Param('id') id: string) {
    return await this.notificationsService.readAllUserNotifications(id);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') id: string) {
    return await this.notificationsService.delete(id);
  }

  @Delete('/users/:id')
  async deleteAllUserNotifications(@Param('id') id: string) {
    return await this.notificationsService.deleteAllUserNotifications(id);
  }
}
