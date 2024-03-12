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
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.projectsService.delete(id);
  }
}
