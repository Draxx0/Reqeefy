import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerQueries } from './queries/queries';
import { PaginatedData } from '@reqeefy/types';
import { CustomerEntity } from './entities/customer.entity';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UserRequest } from 'src/common/types/api';
import { UsersService } from '../users/users.service';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/agency/:id')
  async create(
    @Body() createCustomerDto: CreateCustomerDto[],
    @Param('id') id: string,
    @Req() req: UserRequest,
  ) {
    console.log(req.user);
    const user = await this.usersService.findOneById(req.user.id);

    if (user.role !== 'superadmin') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return this.customersService.create(createCustomerDto, id);
  }

  @Get()
  async findAll(
    @Query() queries: CustomerQueries,
  ): Promise<PaginatedData<CustomerEntity>> {
    return this.customersService.findAll(queries);
  }
}
