import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { TicketSubjectCategoriesService } from './ticket-subject-categories.service';
import { CreateTicketSubjectCategoryDto } from './dto/create-ticket-subject-category.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { TicketSubjectCategoriesQueries } from './queries/queries';

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

  @Get('/project/:id')
  findAll(
    @Query() queries: TicketSubjectCategoriesQueries,
    @Param('id') id: string,
  ) {
    return this.ticketSubjectCategoriesService.findAll(queries, id);
  }
}
