import { Module, forwardRef } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { PaginationModule } from '../common/models/pagination.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEntity } from './entities/agent.entity';
import { UsersModule } from '../users/users.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { AgenciesModule } from '../agencies/agencies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AgentEntity]),
    PaginationModule,
    AuthenticationModule,
    UsersModule,
    // forwardRef(() => AgenciesModule),
  ],
  controllers: [AgentsController],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}
