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
import { AgenciesService } from './agencies.service';
import { AgencyQueries } from './queries/queries';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateAgencyWithNewUserDto } from './dto/create-agency.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles, SUPERADMINS_PERMISSIONS } from 'src/decorator/roles.decorator';
import { AgencyEntity } from './entities/agency.entity';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  // DEV ENDPOINT
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() queries: AgencyQueries) {
    return this.agenciesService.findAll(queries);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    //! NEED GUARD IF USER THAT REQUEST IS IN AGENCY
    return this.agenciesService.findOneById(id);
  }

  @Post()
  createWithNewUser(@Body() createAgencyDto: CreateAgencyWithNewUserDto) {
    return this.agenciesService.createWithNewUser(createAgencyDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...SUPERADMINS_PERMISSIONS)
  update(
    @Param('id') id: string,
    @Body() updateAgencyDto: Partial<AgencyEntity>,
  ) {
    return this.agenciesService.update(id, updateAgencyDto);
  }
}
