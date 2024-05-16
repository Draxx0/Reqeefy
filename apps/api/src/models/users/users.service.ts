import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedData, UserRole } from '@reqeefy/types';
import { JwtUtilsService } from 'src/authentication/jwt/jwt-utils.service';
import { UserRequest } from 'src/common/types/api';
import { DeleteResult, Repository } from 'typeorm';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { UploadFilesService } from '../upload-files/upload-files.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserQueries } from './queries/queries';

@Injectable()
export class UsersService {
  constructor(
    // REPOSITORIES
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // SERVICES
    private readonly paginationService: PaginationService,
    private readonly uploadFilesService: UploadFilesService,
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
      .leftJoinAndSelect('user.notifications', 'notifications')
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
      .leftJoinAndSelect('agent.agency_group', 'agency_group')
      .leftJoinAndSelect('user.customer', 'customer')
      .leftJoinAndSelect('customer.project', 'project')
      .leftJoinAndSelect('user.agency', 'agency')
      .leftJoinAndSelect('user.messages', 'messages')
      .leftJoinAndSelect('user.preferences', 'preferences')
      .leftJoinAndSelect('user.notifications', 'notifications')
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
      .leftJoinAndSelect('agent.agency_group', 'agency_group')
      .leftJoinAndSelect('user.customer', 'customer')
      .leftJoinAndSelect('customer.project', 'project')
      .leftJoinAndSelect('user.messages', 'messages')
      .leftJoinAndSelect('user.preferences', 'preferences')
      .leftJoinAndSelect('user.notifications', 'notifications')
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
    res,
  }: {
    userId: string;
    req: UserRequest;
    body: UpdateUserDto;
    res;
  }): Promise<UserEntity> {
    //! Should be replaced by a guard
    const user = await this.findOneById(userId);

    if (user.id !== req.user.id) {
      throw new UnauthorizedException(
        HttpStatus.UNAUTHORIZED,
        'You are not authorized to update this user',
      );
    }
    //!

    if (body.avatar) {
      if (user.avatar) {
        await this.uploadFilesService.delete(user.avatar.id);
      }

      const newUserAvatar = await this.uploadFilesService.createUserFile(
        {
          file_name: body.avatar.file_name,
          file_url: body.avatar.file_url,
        },
        user.id,
      );

      body.avatar = {
        file_name: newUserAvatar.file_name,
        file_url: newUserAvatar.file_url,
      };
    }

    const update = await this.userRepository.save({
      ...user,
      ...body,
    });

    // get the user from findOneById to get the joined relations
    const updatedUser = await this.findOneByEmail(update.email);

    return await this.jwtUtilsService.reauthenticateUser(updatedUser, res);
  }
}
