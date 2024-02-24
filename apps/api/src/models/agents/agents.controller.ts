import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AgentsService } from './agents.service';
import { PaginatedData } from '@reqeefy/types';
import { AgentEntity } from './entities/agent.entity';
import { AgentQueries } from './queries/queries';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';
import { AddAgentToAgencyDTO, CreateAgentDTO } from './dto/create-agent.dto';

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

  @Post('/agency/:id')
  async createUsersAgent(
    @Body() body: CreateAgentDTO[],
    @Param('id') id: string,
  ) {
    console.log('BODY : ', body);
    return await Promise.all(
      body.map((agent) => this.agentsService.createUserAgent(agent, id)),
    );
  }

  @Post('/user/:id')
  async addExistingUserAgentToAgency(
    @Body() body: AddAgentToAgencyDTO,
    @Param('id') id: string,
  ) {
    return this.agentsService.createExistingUserAgent(body, id);
  }
}
