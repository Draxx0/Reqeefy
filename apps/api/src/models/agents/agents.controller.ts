import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AgentsService } from './agents.service';
import { PaginatedData } from '@reqeefy/types';
import { AgentEntity } from './entities/agent.entity';
import { AgentQueries } from './queries/queries';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AddAgentToAgencyDTO, CreateAgentDTO } from './dto/create-agent.dto';
import { AddToAgencyGroupDTO } from './dto/add-to-agency-group.dto';
import { Roles, SUPERADMINS_PERMISSIONS } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('agents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  async findAll(
    @Query() queries: AgentQueries,
  ): Promise<PaginatedData<AgentEntity>> {
    return this.agentsService.findAll(queries);
  }

  @Post('/agency/:id')
  @Roles(...SUPERADMINS_PERMISSIONS)
  async createUsersAgent(
    @Body() body: CreateAgentDTO,
    @Param('id') id: string,
  ) {
    return await this.agentsService.createUserAgent(body, id);
  }

  @Post('/user/:id')
  async addExistingUserAgentToAgency(
    @Body() body: AddAgentToAgencyDTO,
    @Param('id') id: string,
  ) {
    return this.agentsService.createExistingUserAgent(body, id);
  }

  @Put(':id/add-to-agency-group')
  async addAgentToAgencyGroup(
    @Param('id') id: string,
    @Body() body: AddToAgencyGroupDTO,
  ) {
    const { agency_groups_ids } = body;
    return Promise.all(
      agency_groups_ids.map((agency_group_id) =>
        this.agentsService.addAgentToAgencyGroup(id, agency_group_id),
      ),
    );
  }
}
