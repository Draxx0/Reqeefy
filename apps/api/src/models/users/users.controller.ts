import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { PaginatedData } from '@reqeefy/types';
import { UserQueries } from './queries/queries';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query() queries: UserQueries,
  ): Promise<PaginatedData<UserEntity>> {
    return await this.usersService.findAll(queries);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): Promise<DeleteResult> {
    return this.usersService.deleteOne(id);
  }
}
