import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { PaginatedData } from '@reqeefy/types';
import { AgentEntity } from './entities/agent.entity';
import { AgentQueries } from './queries/queries';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';

@Controller('agents')
@UseGuards(JwtAuthGuard)
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  async findAll(
    @Query() queries: AgentQueries,
  ): Promise<PaginatedData<AgentEntity>> {
    return this.agentsService.findAll(queries);
  }
}
