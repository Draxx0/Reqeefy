import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtUtilsModule } from '../../authentication/jwt/jwt-utils.module';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { UploadFilesModule } from '../upload-files/upload-files.module';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PaginationModule,
    JwtUtilsModule,
    UploadFilesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
