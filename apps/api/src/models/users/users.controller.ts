import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PaginatedData } from '@reqeefy/types';
import { DeleteResult } from 'typeorm';
import { IsOwner } from '../../decorator/isOwner.decorator';
import { Public } from '../../decorator/public.decorator';
import {
  Roles,
  SUPERADMINS_PERMISSIONS,
} from '../../decorator/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserQueries } from './queries/queries';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //!DEV ENDPOINT
  @Public()
  @Get()
  async findAll(
    @Query() queries: UserQueries,
  ): Promise<PaginatedData<UserEntity>> {
    return await this.usersService.findAll(queries);
  }

  @Put(':id')
  @IsOwner()
  async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Res({ passthrough: true }) res,
  ) {
    return await this.usersService.updateUserProfile({
      userId: id,
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
