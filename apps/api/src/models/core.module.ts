import { Module } from '@nestjs/common';
import { AgenciesModule } from './agencies/agencies.module';
import { AgencyGroupsModule } from './agency-groups/agency-groups.module';
import { AgentsModule } from './agents/agents.module';
import { CustomersModule } from './customers/customers.module';
import { MessagesModule } from './messages/messages.module';
import { ProjectsModule } from './projects/projects.module';
import { TicketSubjectCategoriesModule } from './ticket-subject-categories/ticket-subject-categories.module';
import { TicketsModule } from './tickets/tickets.module';
import { UploadFilesModule } from './upload-files/upload-files.module';
import { UsersModule } from './users/users.module';
import { TicketSubjectsModule } from './ticket-subjects/ticket-subjects.module';

@Module({
  imports: [
    AgenciesModule,
    AgencyGroupsModule,
    AgentsModule,
    CustomersModule,
    MessagesModule,
    ProjectsModule,
    TicketSubjectCategoriesModule,
    TicketSubjectsModule,
    TicketsModule,
    UploadFilesModule,
    UsersModule,
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class CoreModule {}
