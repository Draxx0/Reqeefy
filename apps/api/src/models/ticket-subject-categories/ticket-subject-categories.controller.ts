import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { TicketSubjectCategoriesService } from './ticket-subject-categories.service';
import { CreateTicketSubjectCategoryDto } from './dto/create-ticket-subject-category.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';

@Controller('ticket-subject-categories')
@UseGuards(JwtAuthGuard)
export class TicketSubjectCategoriesController {
  constructor(
    private readonly ticketSubjectCategoriesService: TicketSubjectCategoriesService,
  ) {}

  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() createTicketSubjectCategoryDto: CreateTicketSubjectCategoryDto,
  ) {
    return this.ticketSubjectCategoriesService.create(
      id,
      createTicketSubjectCategoryDto,
    );
  }

  @Get()
  findAll() {
    return this.ticketSubjectCategoriesService.findAll();
  }
}
