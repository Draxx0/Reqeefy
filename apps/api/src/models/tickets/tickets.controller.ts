import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserRequest } from 'src/common/types/api';
import {
  CUSTOMERS_PERMISSIONS,
  DISTRIBUTORS_PERMISSIONS,
  Roles,
  SUPERADMINS_PERMISSIONS,
} from 'src/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../users/users.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { DistributeTicketDTO } from './dto/distribute-ticket.dto';
import { TicketQueries } from './queries/queries';
import { TicketsService } from './tickets.service';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/project/:id')
  @Roles(...CUSTOMERS_PERMISSIONS)
  async create(
    @Body() createTicketDto: CreateTicketDto,
    @Param('id') id: string,
    @Req() req: UserRequest,
  ) {
    return this.ticketsService.create(createTicketDto, id, req.user.id);
  }

  @Post(':id/messages')
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Param('id') id: string,
    @Req() req: UserRequest,
  ) {
    const user = await this.usersService.findOneById(req.user.id);

    const ticket = await this.ticketsService.findOneById(id);

    if (!ticket.distributed) {
      throw new HttpException(
        'Ticket not distributed, you can"t add a message',
        400,
      );
    }

    await this.ticketsService.updateStatus(ticket, user);

    return this.messagesService.create(createMessageDto, id, req.user.id);
  }

  @Get('agency/:id')
  findAllByAgency(
    @Param('id') id: string,
    @Query() queries: TicketQueries,
    @Request() req: UserRequest,
  ) {
    return this.ticketsService.findAllDistributedByAgency(
      queries,
      id,
      req.user.id,
    );
  }

  @Get('agency/:id/to-distribute')
  findAllToDistribute(
    @Param('id') id: string,
    @Query() queries: TicketQueries,
  ) {
    return this.ticketsService.findAllToDistributeByAgency(queries, id);
  }

  @Get('project/:id')
  findAllByProject(@Param('id') id: string, @Query() queries: TicketQueries) {
    return this.ticketsService.findAllByProjects(queries, id);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.ticketsService.findOneById(id);
  }

  @Put(':id/archive')
  @Roles(...SUPERADMINS_PERMISSIONS)
  archiveTicket(@Param('id') id: string) {
    return this.ticketsService.archiveTicket(id);
  }

  @Put(':id/distribute')
  @Roles(...DISTRIBUTORS_PERMISSIONS)
  async distribute(@Param('id') id: string, @Body() body: DistributeTicketDTO) {
    return this.ticketsService.distribute(id, body);
  }
}
