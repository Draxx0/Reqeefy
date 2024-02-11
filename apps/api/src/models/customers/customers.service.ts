import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerQueries } from './queries/queries';
import { PaginatedData } from '@reqeefy/types';
import { CustomerEntity } from './entities/customer.entity';
import { PaginationService } from '../common/models/pagination.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return 'create ';
  }

  async findAll(
    queries: CustomerQueries,
  ): Promise<PaginatedData<CustomerEntity>> {
    const {
      page = 1,
      limit_per_page = 10,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = queries;

    const query = this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user');

    if (search) {
      query.where(
        'customer.user.firstName LIKE :search OR customer.user.lastName LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    const [users, total] = await query
      .skip((page - 1) * limit_per_page)
      .orderBy(`user.${sort_by}`, sort_order)
      .take(limit_per_page)
      .getManyAndCount();

    return this.paginationService.paginate<CustomerEntity>({
      page,
      total,
      limit_per_page,
      data: users,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
