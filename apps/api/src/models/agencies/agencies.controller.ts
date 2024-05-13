import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgencyQueries } from './queries/queries';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateAgencyWithNewUserDto } from './dto/create-agency.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles, SUPERADMINS_PERMISSIONS } from 'src/decorator/roles.decorator';
import { JwtUtilsService } from 'src/authentication/jwt/jwt-utils.service';
import { UpdateAgencyDTO } from './dto/update-agency.dto';

@Controller('agencies')
export class AgenciesController {
  constructor(
    private readonly agenciesService: AgenciesService,
    private readonly jwtUtilsService: JwtUtilsService,
  ) {}

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
  async createWithNewUser(
    @Res({ passthrough: true }) response,
    @Body() createAgencyDto: CreateAgencyWithNewUserDto,
  ) {
    const agencyFounder =
      await this.agenciesService.createWithNewUser(createAgencyDto);

    const { access_token, refresh_token } =
      await this.jwtUtilsService.generateJwtToken({
        id: agencyFounder.id,
        email: agencyFounder.email,
        role: agencyFounder.role,
      });

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: access_token,
      cookieName: 'ACCESS_TOKEN',
    });

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: refresh_token,
      cookieName: 'REFRESH_TOKEN',
    });

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: JSON.stringify(agencyFounder),
      cookieName: 'USER_DATA',
    });

    return agencyFounder;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...SUPERADMINS_PERMISSIONS)
  update(@Param('id') id: string, @Body() updateAgencyDto: UpdateAgencyDTO) {
    return this.agenciesService.update(id, updateAgencyDto);
  }
}
