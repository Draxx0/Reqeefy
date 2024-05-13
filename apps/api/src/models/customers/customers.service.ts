import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    // REPOSITORIES
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    // SERVICES
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
        'customer',
      );

    const customer = this.customerRepository.create({
      user: updatedUser,
      project: { id: body.project_id },
    });

    return this.customerRepository.save(customer);
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

  async findOneByUserId(userId: string) {
    const customer = this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where('customer.user.id = :userId', { userId })
      .getOne();

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    return customer;
  }

  async findAllByIds(ids: string[]) {
    return this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where('customer.id IN (:...ids)', { ids })
      .getMany();
  }
}
