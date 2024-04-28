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
  Put,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { TicketQueries } from './queries/queries';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { UserRequest } from 'src/common/types/api';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../users/users.service';
import { DistributeTicketDTO } from './dto/distribute-ticket.dto';
import { AgencyGroupsService } from '../agency-groups/agency-groups.service';
import { DISTRIBUTORS_PERMISSIONS, Roles } from 'src/decorator/roles.decorator';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly messagesService: MessagesService,
    private readonly usersService: UsersService,
    private readonly agencyGroupsService: AgencyGroupsService,
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

    return this.ticketsService.create(createTicketDto, id, user.id);
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
  findAllByAgency(@Param('id') id: string, @Query() queries: TicketQueries) {
    return this.ticketsService.findAllByAgency(queries, id);
  }

  @Get('project/:id')
  findAllByProject(@Param('id') id: string, @Query() queries: TicketQueries) {
    return this.ticketsService.findAllByProjects(queries, id);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.ticketsService.findOneById(id);
  }

  @Put(':id/distribute')
  @Roles(...DISTRIBUTORS_PERMISSIONS)
  async distribute(@Param('id') id: string, @Body() body: DistributeTicketDTO) {
    return this.ticketsService.distribute(id, body);
  }
}
