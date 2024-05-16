import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsService } from './notifications.service';
import { NotificationEntity } from './entities/notification.entity';
import { TicketEntity } from '../tickets/entities/ticket.entity';
import { MessageEntity } from '../messages/entities/message.entity';
import { UserEntity } from '../users/entities/user.entity';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NotificationEntity,
      TicketEntity,
      MessageEntity,
      UserEntity,
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
