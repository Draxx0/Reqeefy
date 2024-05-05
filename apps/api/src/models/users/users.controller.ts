import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { PaginatedData } from '@reqeefy/types';
import { UserQueries } from './queries/queries';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRequest } from 'src/common/types/api';
import { Roles, SUPERADMINS_PERMISSIONS } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query() queries: UserQueries,
  ): Promise<PaginatedData<UserEntity>> {
    return await this.usersService.findAll(queries);
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res,
  ) {
    console.log('body', body);
    return await this.usersService.updateUserProfile({
      userId: id,
      req,
      body,
      res,
    });
  }

  @Delete(':id')
  @Roles(...SUPERADMINS_PERMISSIONS)
  deleteOne(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.deleteOne(id);
  }
}
