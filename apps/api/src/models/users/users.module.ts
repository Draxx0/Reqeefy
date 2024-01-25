import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PaginationModule } from '../common/models/pagination.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PaginationModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
