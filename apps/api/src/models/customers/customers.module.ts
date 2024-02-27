import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { PaginationModule } from '../common/models/pagination/pagination.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity]), PaginationModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
