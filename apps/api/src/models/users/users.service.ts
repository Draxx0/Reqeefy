import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserQueries } from './queries/queries';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { PaginatedData } from '@reqeefy/types';

@Injectable()
export class UsersService {
  constructor(
    // REPOSITORIES
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // SERVICES
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

    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('user.agent', 'agent')
      .leftJoinAndSelect('user.customer', 'customer')
      .leftJoinAndSelect('user.agencies', 'agencies')
      .leftJoinAndSelect('user.messages', 'messages')
      .leftJoinAndSelect('user.preferences', 'preferences');

    if (search) {
      query.where('user.firstName LIKE :search OR user.lastName LIKE :search', {
        search: `%${search}%`,
      });
    }

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
  }

  async findOneByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('user.agent', 'agent')
      .leftJoinAndSelect('user.customer', 'customer')
      .leftJoinAndSelect('user.agencies', 'agencies')
      .leftJoinAndSelect('user.messages', 'messages')
      .leftJoinAndSelect('user.preferences', 'preferences')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      return null;
    }

    return user;
  }

  async findOneById(id: string): Promise<UserEntity | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.agencies', 'agencies')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('user.agent', 'agent')
      .leftJoinAndSelect('user.customer', 'customer')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async updateSelectedOne(
    user: UserEntity,
    updateData: Partial<UserEntity>,
  ): Promise<UserEntity> {
    await this.userRepository.save({ ...user, ...updateData });

    return await this.findOneById(user.id);
  }

  async updateUserAndInsertAgencyRelation(
    user: UserEntity,
    id: string,
  ): Promise<UserEntity> {
    await this.userRepository.save({ ...user, agencies: [{ id }] });

    return await this.findOneById(user.id);
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}