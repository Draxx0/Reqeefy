import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { AgencyQueries } from './queries/queries';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';

@Controller('agencies')
export class AgenciesController {
  constructor(
    private readonly agenciesService: AgenciesService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() queries: AgencyQueries) {
    return this.agenciesService.findAll(queries);
  }

  @Post()
  // Guard jwt
  create(@Body() createAgencyDto: CreateAgencyDto) {
    return this.agenciesService.create(createAgencyDto);
  }
}
