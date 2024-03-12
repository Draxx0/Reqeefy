import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { AgencyGroupsService } from './agency-groups.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateAgencyGroupDTO } from './dto/create-agency-group.dto';

@Controller('agency-groups')
@UseGuards(JwtAuthGuard)
export class AgencyGroupsController {
  constructor(private readonly agencyGroupsService: AgencyGroupsService) {}

  @Get('/agency/:id')
  findAll(@Param('id') id: string) {
    return this.agencyGroupsService.findAllByAgency(id);
  }

  @Post()
  create(@Body() createAgencyGroupDto: CreateAgencyGroupDTO) {
    return this.agencyGroupsService.create(createAgencyGroupDto);
  }
}
