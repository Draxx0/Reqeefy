import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AgentsService } from './agents.service';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { PaginatedData } from '@reqeefy/types';
import { AgentEntity } from './entities/agent.entity';
import { AgentQueries } from './queries/queries';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  // @Post()
  // create(@Body() createAgentDto: CreateAgentDto) {
  //   return this.agentsService.create(createAgentDto);
  // }

  @Get()
  async findAll(
    @Query() queries: AgentQueries,
  ): Promise<PaginatedData<AgentEntity>> {
    return this.agentsService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentsService.update(+id, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentsService.remove(+id);
  }
}
