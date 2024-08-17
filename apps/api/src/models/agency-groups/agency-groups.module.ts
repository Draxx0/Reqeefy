import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgencyGroupsController } from './agency-groups.controller';
import { AgencyGroupsService } from './agency-groups.service';
import { AgencyGroupEntity } from './entities/agency-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgencyGroupEntity])],
  controllers: [AgencyGroupsController],
  providers: [AgencyGroupsService],
  exports: [AgencyGroupsService],
})
export class AgencyGroupsModule {}
