import { Module } from '@nestjs/common';
import { AgencyGroupsService } from './agency-groups.service';
import { AgencyGroupsController } from './agency-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyGroupEntity } from './entities/agency-group.entity';
import { PaginationModule } from '../common/models/pagination/pagination.module';

@Module({
  imports: [TypeOrmModule.forFeature([AgencyGroupEntity]), PaginationModule],
  controllers: [AgencyGroupsController],
  providers: [AgencyGroupsService],
  exports: [AgencyGroupsService],
})
export class AgencyGroupsModule {}
