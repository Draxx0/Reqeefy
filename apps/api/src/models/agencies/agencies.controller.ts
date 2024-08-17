import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtUtilsService } from 'src/authentication/jwt/jwt-utils.service';
import { UserRequest } from 'src/common/types/api';
import {
  FIFTEEN_MINUTES,
  FOURTEEN_DAYS,
} from 'src/constants/cookies.constants';
import { Public } from 'src/decorator/public.decorator';
import { Roles, SUPERADMINS_PERMISSIONS } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { generateExpirationDate } from 'src/utils/generateExpirationDate';
import { AgenciesService } from './agencies.service';
import { CreateAgencyWithNewUserDto } from './dto/create-agency.dto';
import { UpdateAgencyDTO } from './dto/update-agency.dto';
import { AgencyQueries } from './queries/queries';

@Controller('agencies')
export class AgenciesController {
  constructor(
    private readonly agenciesService: AgenciesService,
    private readonly jwtUtilsService: JwtUtilsService,
  ) {}

  @Get()
  findAll(@Query() queries: AgencyQueries) {
    return this.agenciesService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: UserRequest) {
    if (req.user.agency.id !== id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return this.agenciesService.findOneById(id);
  }

  @Public()
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
      expires: generateExpirationDate(FIFTEEN_MINUTES),
    });

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: refresh_token,
      cookieName: 'REFRESH_TOKEN',
      expires: generateExpirationDate(FOURTEEN_DAYS),
    });

    await this.jwtUtilsService.setResponseCookies({
      response,
      data: JSON.stringify({
        id: agencyFounder.id,
        email: agencyFounder.email,
        role: agencyFounder.role,
      }),
      cookieName: 'USER_DATA',
      expires: generateExpirationDate(FOURTEEN_DAYS),
    });

    return agencyFounder;
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(...SUPERADMINS_PERMISSIONS)
  update(@Param('id') id: string, @Body() updateAgencyDto: UpdateAgencyDTO) {
    return this.agenciesService.update(id, updateAgencyDto);
  }
}
