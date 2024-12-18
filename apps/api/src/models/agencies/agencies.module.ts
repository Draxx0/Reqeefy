import { Module } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgenciesController } from './agencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyEntity } from './entities/agency.entity';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { UsersModule } from '../users/users.module';
import { AgentsModule } from '../agents/agents.module';
import { AgencyGroupsModule } from '../agency-groups/agency-groups.module';
import { UserEntity } from '../users/entities/user.entity';
import { JwtUtilsModule } from 'src/authentication/jwt/jwt-utils.module';
import { UploadFilesModule } from '../upload-files/upload-files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgencyEntity, UserEntity]),
    AgentsModule,
    AuthenticationModule,
    PaginationModule,
    AgencyGroupsModule,
    UsersModule,
    UploadFilesModule,
    JwtUtilsModule,
  ],
  controllers: [AgenciesController],
  providers: [AgenciesService],
  exports: [AgenciesService],
})
export class AgenciesModule {}
