import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgencyQueries } from './queries/queries';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import {
  CreateAgencyWithExistingUserDto,
  CreateAgencyWithNewUserDto,
} from './dto/create-agency.dto';

@Controller('agencies')
export class AgenciesController {
  constructor(private readonly agenciesService: AgenciesService) {}

  // DEV ENDPOINT
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() queries: AgencyQueries) {
    return this.agenciesService.findAll(queries);
  }

  @Post()
  createWithNewUser(@Body() createAgencyDto: CreateAgencyWithNewUserDto) {
    return this.agenciesService.createWithNewUser(createAgencyDto);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  createWithExistingUser(
    @Param('id') id: string,
    @Body() createAgencyDto: CreateAgencyWithExistingUserDto,
  ) {
    return this.agenciesService.createWithExistingUser(id, createAgencyDto);
  }
}
