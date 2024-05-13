import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { AgencyGroupsService } from './agency-groups.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateAgencyGroupDTO } from './dto/create-agency-group.dto';
import {
  DISTRIBUTORS_PERMISSIONS,
  Roles,
  SUPERADMINS_PERMISSIONS,
} from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('agency-groups')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AgencyGroupsController {
  constructor(private readonly agencyGroupsService: AgencyGroupsService) {}

  @Get('/agency/:id')
  @Roles(...DISTRIBUTORS_PERMISSIONS)
  findAll(@Param('id') id: string) {
    return this.agencyGroupsService.findAllByAgency(id);
  }

  @Post('/agency/:id')
  @Roles(...SUPERADMINS_PERMISSIONS)
  create(@Param('id') id: string, @Body() body: CreateAgencyGroupDTO) {
    return this.agencyGroupsService.create(body, id);
  }
}
