import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { UsersModule } from '../users/users.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomerEntity } from './entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity]),
    PaginationModule,
    AuthenticationModule,
    UsersModule,
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class CustomersModule {}
