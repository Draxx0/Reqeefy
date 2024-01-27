import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserQueries } from './queries/queries';
import { PaginationService } from '../common/models/pagination.service';
import { PaginatedData } from '@reqeefy/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(queries: UserQueries): Promise<PaginatedData<UserEntity>> {
    const {
      page = 1,
      limit_per_page = 10,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = queries;

    const query = this.userRepository.createQueryBuilder('user');

    if (search) {
      query.where('user.firstName LIKE :search OR user.lastName LIKE :search', {
        search: `%${search}%`,
      });
    }

    try {
      const [users, total] = await query
        .skip((page - 1) * limit_per_page)
        .orderBy(`user.${sort_by}`, sort_order)
        .take(limit_per_page)
        .getManyAndCount();

      return this.paginationService.paginate<UserEntity>({
        page,
        total,
        limit_per_page,
        data: users,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.softDelete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
