import {
  Controller,
  Get,
  HttpException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';
import { MessagesService } from './messages.service';
import { UserRequest } from 'src/common/types/api';
import { UsersService } from '../users/users.service';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
  ) {}

  @Get('/:id')
  async updateReadStatus(@Param('id') id: string, @Req() req: UserRequest) {
    if (!req.user) throw new HttpException('Unauthorized', 401);
    const user = await this.usersService.findOneById(req.user.id);

    // If user is not an agent, don't update read status
    if (!user.agent) return;

    return this.messagesService.updateReadStatus(id);
  }
}
