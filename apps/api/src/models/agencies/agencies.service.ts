import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationService } from 'src/authentication/authentication.service';
import { Repository } from 'typeorm';
import { AgencyGroupsService } from '../agency-groups/agency-groups.service';
import { AgentsService } from '../agents/agents.service';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { UsersService } from '../users/users.service';
import { CreateAgencyWithNewUserDto } from './dto/create-agency.dto';
import { AgencyEntity } from './entities/agency.entity';
import { AgencyQueries } from './queries/queries';
import { UserEntity } from '../users/entities/user.entity';
import { UpdateAgencyDTO } from './dto/update-agency.dto';
import { UploadFilesService } from '../upload-files/upload-files.service';

@Injectable()
export class AgenciesService {
  constructor(
    // REPOSITORIES
    @InjectRepository(AgencyEntity)
    private readonly agencyRepository: Repository<AgencyEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    // SERVICES
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly agencyGroupsService: AgencyGroupsService,
    private readonly agentService: AgentsService,
    private readonly uploadFilesService: UploadFilesService,
    private readonly paginationService: PaginationService,
  ) {}

  async findAll(queries: AgencyQueries) {
    const {
      page = 1,
      limit_per_page = 10,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = queries;

    const query = this.agencyRepository
      .createQueryBuilder('agency')
      .leftJoinAndSelect('agency.users', 'users')
      .leftJoinAndSelect('users.agent', 'agent')
      .leftJoinAndSelect('users.customer', 'customer')
      .leftJoinAndSelect('agency.agency_photo', 'agency_photo')
      .leftJoinAndSelect('agency.agency_groups', 'agency_groups')
      .leftJoinAndSelect('agency.projects', 'projects');

    if (search) {
      query.where('agency.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    const [agencies, total] = await query
      .skip((page - 1) * limit_per_page)
      .orderBy(`agency.${sort_by}`, sort_order)
      .take(limit_per_page)
      .getManyAndCount();

    return this.paginationService.paginate<AgencyEntity>({
      page,
      total,
      limit_per_page,
      data: agencies,
    });
  }

  async findOneById(id: string) {
    return await this.agencyRepository
      .createQueryBuilder('agency')
      .leftJoinAndSelect('agency.users', 'users')
      .leftJoinAndSelect('users.agent', 'agent')
      .leftJoinAndSelect('agent.agency_group', 'agent_group')
      .leftJoinAndSelect('users.customer', 'customer')
      .leftJoinAndSelect('customer.project', 'project')
      .leftJoinAndSelect('agency.agency_photo', 'agency_photo')
      .leftJoinAndSelect('agency.agency_groups', 'agency_groups')
      .leftJoinAndSelect('agency.projects', 'projects')
      .where('agency.id = :id', { id })
      .getOne();
  }

  async createWithNewUser(
    body: CreateAgencyWithNewUserDto,
  ): Promise<UserEntity> {
    const {
      email,
      first_name,
      last_name,
      password,
      activity_area,
      description,
      name,
      website_url,
    } = body;

    const signedUser = await this.authenticationService.signup({
      email,
      first_name,
      last_name,
      password,
    });

    const agency = this.agencyRepository.create({
      activity_area,
      description,
      name,
      website_url,
    });

    await this.agencyRepository.save(agency);

    const agent = await this.agentService.create(signedUser.id);

    const updatedUser = await this.usersService.updateSelectedOne(signedUser, {
      ...signedUser,
      role: 'superadmin',
      agent,
      agency,
    });

    await this.userRepository.save(updatedUser);

    const user = await this.authenticationService.signin({
      email,
      password,
    });

    return user;
  }

  async update(id: string, body: UpdateAgencyDTO) {
    const agency = await this.findOneById(id);

    if (body.agency_photo) {
      if (agency.agency_photo) {
        await this.uploadFilesService.delete(agency.agency_photo.id);
      }

      const newAgencyPhoto = await this.uploadFilesService.createAgencyFile({
        agencyId: agency.id,
        file_name: body.agency_photo.file_name,
        file_url: body.agency_photo.file_url,
      });

      body.agency_photo = {
        agencyId: agency.id,
        file_name: newAgencyPhoto.file_name,
        file_url: newAgencyPhoto.file_url,
      };
    }

    const updatedAgency = await this.agencyRepository.save({
      ...agency,
      ...body,
    });

    return updatedAgency;
  }

  private async createAgencyGroups(agency_groups: string[], agencyId: string) {
    return await Promise.all(
      agency_groups.map((group_name) =>
        this.agencyGroupsService.create(
          {
            name: group_name,
          },
          agencyId,
        ),
      ),
    );
  }
}
