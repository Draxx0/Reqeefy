import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TicketSubjectsService } from './ticket-subjects.service';
import { CreateTicketSubjectDto } from './dto/create-ticket-subject.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('ticket-subjects')
@UseGuards(JwtAuthGuard)
export class TicketSubjectsController {
  constructor(private readonly ticketSubjectsService: TicketSubjectsService) {}

  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() createTicketSubjectDto: CreateTicketSubjectDto,
  ) {
    return this.ticketSubjectsService.create(id, createTicketSubjectDto);
  }
}
