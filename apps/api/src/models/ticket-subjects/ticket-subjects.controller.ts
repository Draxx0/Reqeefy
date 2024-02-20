import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketSubjectsService } from './ticket-subjects.service';
import { CreateTicketSubjectDto } from './dto/create-ticket-subject.dto';
import { UpdateTicketSubjectDto } from './dto/update-ticket-subject.dto';

@Controller('ticket-subjects')
export class TicketSubjectsController {
  constructor(private readonly ticketSubjectsService: TicketSubjectsService) {}

  @Post()
  create(@Body() createTicketSubjectDto: CreateTicketSubjectDto) {
    return this.ticketSubjectsService.create(createTicketSubjectDto);
  }

  @Get()
  findAll() {
    return this.ticketSubjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketSubjectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketSubjectDto: UpdateTicketSubjectDto) {
    return this.ticketSubjectsService.update(+id, updateTicketSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketSubjectsService.remove(+id);
  }
}
