import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AgenciesModule } from './agencies/agencies.module';
import { AgencyGroupsModule } from './agency-groups/agency-groups.module';
import { AgentsModule } from './agents/agents.module';
import { CustomersModule } from './customers/customers.module';
import { MessagesModule } from './messages/messages.module';
import { ProjectsModule } from './projects/projects.module';
import { TicketsModule } from './tickets/tickets.module';
import { UploadFilesModule } from './upload-files/upload-files.module';
import { UserPreferencesModule } from './user-preferences/user-preferences.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    AgenciesModule,
    AgencyGroupsModule,
    AgentsModule,
    CustomersModule,
    MessagesModule,
    ProjectsModule,
    TicketsModule,
    UploadFilesModule,
    AuthenticationModule,
    UserPreferencesModule,
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class CoreModule {}
