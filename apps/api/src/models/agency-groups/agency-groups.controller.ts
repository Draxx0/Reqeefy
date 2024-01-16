import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgencyGroupsService } from './agency-groups.service';
import { CreateAgencyGroupDto } from './dto/create-agency-group.dto';
import { UpdateAgencyGroupDto } from './dto/update-agency-group.dto';

@Controller('agency-groups')
export class AgencyGroupsController {
  constructor(private readonly agencyGroupsService: AgencyGroupsService) {}

  @Post()
  create(@Body() createAgencyGroupDto: CreateAgencyGroupDto) {
    return this.agencyGroupsService.create(createAgencyGroupDto);
  }

  @Get()
  findAll() {
    return this.agencyGroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agencyGroupsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgencyGroupDto: UpdateAgencyGroupDto) {
    return this.agencyGroupsService.update(+id, updateAgencyGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agencyGroupsService.remove(+id);
  }
}
