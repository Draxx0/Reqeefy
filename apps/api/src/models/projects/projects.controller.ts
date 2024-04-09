import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { ProjectQueries } from './queries/queries';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AddCustomersToProjectDTO } from './dto/add-customers-to-project.dto';
import { CustomersService } from '../customers/customers.service';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly customersService: CustomersService,
  ) {}

  @Post('/agency/:id')
  async create(
    @Body() createProjectDto: CreateProjectDTO,
    @Param('id') id: string,
  ) {
    return await this.projectsService.create(createProjectDto, id);
  }

  @Get('/agency/:id')
  async findAllByAgency(
    @Query() queries: ProjectQueries,
    @Param('id') id: string,
  ) {
    return await this.projectsService.findAllByAgency(queries, id);
  }

  @Put(':id')
  async addCustomersToProject(
    @Param('id') id: string,
    @Body() body: AddCustomersToProjectDTO,
  ) {
    const customers = await this.customersService.findAllByIds(
      body.customers_ids,
    );

    return await this.projectsService.addCustomersToProject(id, customers);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.projectsService.delete(id);
  }
}
