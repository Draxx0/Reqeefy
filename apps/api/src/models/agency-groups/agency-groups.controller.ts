import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AgencyGroupsService } from './agency-groups.service';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';
import { CreateAgencyGroupDTO } from './dto/create-agency-group.dto';

@Controller('agency-groups')
@UseGuards(JwtAuthGuard)
export class AgencyGroupsController {
  constructor(private readonly agencyGroupsService: AgencyGroupsService) {}

  @Get()
  findAll() {
    return this.agencyGroupsService.findAll();
  }

  @Post()
  create(@Body() createAgencyGroupDto: CreateAgencyGroupDTO) {
    return this.agencyGroupsService.create(createAgencyGroupDto);
  }
}
