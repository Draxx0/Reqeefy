import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PaginatedData } from '@reqeefy/types';
import {
  Roles,
  SUPERADMINS_PERMISSIONS,
} from '../../decorator/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerQueries } from './queries/queries';

@Controller('customers')
@UseGuards(RolesGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/agency/:id')
  @Roles(...SUPERADMINS_PERMISSIONS)
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
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
