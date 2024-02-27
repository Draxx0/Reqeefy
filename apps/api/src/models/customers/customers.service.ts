import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerQueries } from './queries/queries';
import { PaginatedData } from '@reqeefy/types';
import { CustomerEntity } from './entities/customer.entity';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    private readonly authenticationService: AuthenticationService,
    private readonly paginationService: PaginationService,
    private readonly usersService: UsersService,
  ) {}

  async create(body: CreateCustomerDto, agencyId: string) {
    const signedUser = await this.authenticationService.signup(body);

    const updatedUser =
      await this.usersService.updateUserAndInsertAgencyRelation(
        signedUser,
        agencyId,
      );

    const customer = this.customerRepository.create({
      user: updatedUser,
    });

    return await this.customerRepository.save(customer);
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
}
