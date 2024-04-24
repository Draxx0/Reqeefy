import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerQueries } from './queries/queries';
import { PaginatedData } from '@reqeefy/types';
import { CustomerEntity } from './entities/customer.entity';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UsersService } from '../users/users.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('customers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/agency/:id')
  @Roles('superadmin')
  async create(
    @Body() createCustomerDto: CreateCustomerDto[],
    @Param('id') id: string,
  ) {
    return this.customersService.create(createCustomerDto, id);
  }

  @Get()
  async findAll(
    @Query() queries: CustomerQueries,
  ): Promise<PaginatedData<CustomerEntity>> {
    return this.customersService.findAll(queries);
  }
}
