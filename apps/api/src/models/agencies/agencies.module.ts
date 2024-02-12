import { Module } from '@nestjs/common';
import { AgenciesService } from './agencies.service';
import { AgenciesController } from './agencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyEntity } from './entities/agency.entity';
import { PaginationModule } from '../common/models/pagination.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgencyEntity]),
    AuthenticationModule,
    PaginationModule,
    UsersModule,
  ],
  controllers: [AgenciesController],
  providers: [AgenciesService],
})
export class AgenciesModule {}
