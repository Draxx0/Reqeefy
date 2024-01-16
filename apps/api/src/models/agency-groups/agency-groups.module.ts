import { Module } from '@nestjs/common';
import { AgencyGroupsService } from './agency-groups.service';
import { AgencyGroupsController } from './agency-groups.controller';

@Module({
  controllers: [AgencyGroupsController],
  providers: [AgencyGroupsService],
})
export class AgencyGroupsModule {}
