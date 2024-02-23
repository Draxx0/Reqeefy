import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TicketSubjectCategoriesService } from './ticket-subject-categories.service';
import { CreateTicketSubjectCategoryDto } from './dto/create-ticket-subject-category.dto';
import { UpdateTicketSubjectCategoryDto } from './dto/update-ticket-subject-category.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';

@Controller('ticket-subject-categories')
@UseGuards(JwtAuthGuard)
export class TicketSubjectCategoriesController {
  constructor(
    private readonly ticketSubjectCategoriesService: TicketSubjectCategoriesService,
  ) {}

  @Post()
  create(
    @Body() createTicketSubjectCategoryDto: CreateTicketSubjectCategoryDto,
  ) {
    return this.ticketSubjectCategoriesService.create(
      createTicketSubjectCategoryDto,
    );
  }

  @Get()
  findAll() {
    return this.ticketSubjectCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketSubjectCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketSubjectCategoryDto: UpdateTicketSubjectCategoryDto,
  ) {
    return this.ticketSubjectCategoriesService.update(
      +id,
      updateTicketSubjectCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketSubjectCategoriesService.remove(+id);
  }
}
