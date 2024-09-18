import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { JwtUtilsModule } from '../../authentication/jwt/jwt-utils.module';
import { AgencyGroupsModule } from '../agency-groups/agency-groups.module';
import { AgentsModule } from '../agents/agents.module';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { UploadFilesModule } from '../upload-files/upload-files.module';
import { UserEntity } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AgenciesController } from './agencies.controller';
import { AgenciesService } from './agencies.service';
import { AgencyEntity } from './entities/agency.entity';

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
