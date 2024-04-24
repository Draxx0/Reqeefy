import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UserQueries } from './queries/queries';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { PaginatedData, UserRole } from '@reqeefy/types';
import { TokenObject, UserRequest } from 'src/common/types/api';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtUtilsService } from 'src/authentication/jwt/jwt-utils.service';

@Injectable()
export class UsersService {
  constructor(
    // REPOSITORIES
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // SERVICES
    private readonly paginationService: PaginationService,
    private jwtUtilsService: JwtUtilsService,
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
      .leftJoinAndSelect('user.agency', 'agency')
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
      .leftJoinAndSelect('user.agency', 'agency')
      .leftJoinAndSelect('user.messages', 'messages')
      .leftJoinAndSelect('user.preferences', 'preferences')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      return null;
    }

    return user;
  }

  async findOneById(id: string): Promise<UserEntity | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.agency', 'agency')
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
    agencyId: string,
    role: UserRole,
  ): Promise<UserEntity> {
    await this.userRepository.save({
      ...user,
      agency: { id: agencyId },
      role,
    });

    return await this.findOneById(user.id);
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async updateUserProfile({
    userId,
    req,
    body,
  }: {
    userId: string;
    req: UserRequest;
    body: UpdateUserDto;
  }): Promise<TokenObject> {
    //! Should be replaced by a guard
    const user = await this.findOneById(userId);

    if (user.id !== req.user.id) {
      throw new UnauthorizedException(
        HttpStatus.UNAUTHORIZED,
        'You are not authorized to update this user',
      );
    }
    //!

    const updatedUser = await this.updateSelectedOne(user, body);

    return await this.jwtUtilsService.generateJwtToken(updatedUser);
  }
}
