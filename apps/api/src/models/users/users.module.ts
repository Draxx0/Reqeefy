import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { JwtUtilsModule } from 'src/authentication/jwt/jwt-utils.module';
import { UploadFilesModule } from '../upload-files/upload-files.module';

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
