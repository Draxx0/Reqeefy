import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Req,
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('ticket/:id')
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    if (!req.user) throw new HttpException('Unauthorized', 401);
    console.log(req.user);
    // return this.messagesService.create(createMessageDto, id, req.user.id);
  }
}
