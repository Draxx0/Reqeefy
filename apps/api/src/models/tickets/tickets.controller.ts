import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
  Req,
  HttpException,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { TicketQueries } from './queries/queries';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { UserRequest } from 'src/common/types/api';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../users/users.service';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/project/:id')
  async create(
    @Body() createTicketDto: CreateTicketDto,
    @Param('id') id: string,
    @Req() req: UserRequest,
  ) {
    const user = await this.usersService.findOneById(req.user.id);

    if (!user.customer) {
      throw new HttpException(
        "You cannot create a ticket if you aren't customer",
        401,
      );
    }
    return this.ticketsService.create(createTicketDto, id);
  }

  @Post(':id/messages')
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Param('id') id: string,
    @Req() req: UserRequest,
  ) {
    if (!req.user) throw new HttpException('Unauthorized', 401);

    const user = await this.usersService.findOneById(req.user.id);

    const ticket = await this.ticketsService.findOneById(id);

    await this.ticketsService.updateStatus(ticket, user);

    return this.messagesService.create(createMessageDto, id, req.user.id);
  }

  @Get('/agency/:id')
  findAllByAgency(@Param('id') id: string, @Query() queries: TicketQueries) {
    return this.ticketsService.findAllByAgency(queries, id);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.ticketsService.findOneById(id);
  }
}
