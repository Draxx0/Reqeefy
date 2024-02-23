import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { AgentsModule } from '../agents/agents.module';
import { PaginationModule } from '../common/models/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    PaginationModule,
    AgentsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
