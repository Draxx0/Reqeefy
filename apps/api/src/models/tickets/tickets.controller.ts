import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';
import { TicketQueries } from './queries/queries';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('/project/:id')
  create(@Body() createTicketDto: CreateTicketDto, @Param('id') id: string) {
    return this.ticketsService.create(createTicketDto, id);
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
