import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateUserPreferencesDTO } from './dto/create-user-preferences.dto';
import { UpdateUserPreferencesDTO } from './dto/update-user-preferences.dto';
import { UserPreferencesService } from './user-preferences.service';

@Controller('user-preferences')
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
