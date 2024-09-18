import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  Roles,
  SUPERADMINS_PERMISSIONS,
} from '../../decorator/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { CustomersService } from '../customers/customers.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';
import { ProjectQueries } from './queries/queries';

@Controller('projects')
@UseGuards(RolesGuard)
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly customersService: CustomersService,
  ) {}

  @Post('/agency/:id')
  @Roles(...SUPERADMINS_PERMISSIONS)
  async create(
    @Body() createProjectDto: CreateProjectDTO,
    @Param('id') id: string,
  ) {
    return await this.projectsService.create(createProjectDto, id);
  }

  @Get('/agency/:id')
  @Roles(...SUPERADMINS_PERMISSIONS)
  async findAllByAgency(
    @Query() queries: ProjectQueries,
    @Param('id') id: string,
  ) {
    return await this.projectsService.findAllByAgency(queries, id);
  }

  @Get(':id')
  @Roles(...SUPERADMINS_PERMISSIONS)
  async findOne(@Param('id') id: string) {
    return await this.projectsService.findOneById(id);
  }

  // @Put(':id')
  // @Roles(...SUPERADMINS_PERMISSIONS)
  // async addCustomersToProject(
  //   @Param('id') id: string,
  //   @Body() body: AddCustomersToProjectDTO,
  // ) {
  //   const customers = await this.customersService.findAllByIds(
  //     body.customers_ids,
  //   );

  //   return await this.projectsService.addCustomersToProject(id, customers);
  // }

  @Delete(':id')
  @Roles(...SUPERADMINS_PERMISSIONS)
  async delete(@Param('id') id: string) {
    return await this.projectsService.delete(id);
  }
}
