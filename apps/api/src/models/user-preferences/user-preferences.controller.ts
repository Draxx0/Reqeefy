import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { CreateUserPreferencesDTO } from './dto/create-user-preferences.dto';
import { UpdateUserPreferencesDTO } from './dto/update-user-preferences.dto';
import { JwtAuthGuard } from 'src/authentication/guards/jwt.guard';

@Controller('user-preferences')
@UseGuards(JwtAuthGuard)
export class UserPreferencesController {
  constructor(
    private readonly userPreferencesService: UserPreferencesService,
  ) {}

  @Post(':id')
  create(@Body() body: CreateUserPreferencesDTO, @Param('id') id: string) {
    return this.userPreferencesService.create(id, body);
  }

  @Put('id')
  update(@Body() body: UpdateUserPreferencesDTO, @Param('id') id: string) {
    return this.userPreferencesService.update(id, body);
  }
}
