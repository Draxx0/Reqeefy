import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from './dto/create-project.dto';
import { ProjectQueries } from './queries/queries';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDTO) {
    return await this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll(@Query() queries: ProjectQueries) {
    return await this.projectsService.findAll(queries);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.projectsService.delete(id);
  }
}
