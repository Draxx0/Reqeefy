import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDTO } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { Repository } from 'typeorm';
import { AgentsService } from '../agents/agents.service';
import { PaginationService } from '../common/models/pagination/pagination.service';
import { ProjectQueries } from './queries/queries';

@Injectable()
export class ProjectsService {
  constructor(
    // REPOSITORIES
    @InjectRepository(ProjectEntity)
    private readonly projectsRepository: Repository<ProjectEntity>,
    // SERVICES
    private readonly paginationService: PaginationService,
    private readonly agentsService: AgentsService,
  ) {}

  async findAllByAgency(queries: ProjectQueries, agencyId: string) {
    const {
      page = 1,
      limit_per_page = 10,
      search,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = queries;

    const query = this.projectsRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.agency', 'agency')
      .leftJoinAndSelect('project.agents_referents', 'agents_referents')
      .leftJoinAndSelect('agents_referents.user', 'user')
      .leftJoinAndSelect('project.tickets', 'tickets')
      .leftJoinAndSelect('project.customers', 'customers')
      .leftJoinAndSelect('project.photo_url', 'photo_url')
      .leftJoinAndSelect(
        'project.ticket_subject_categories',
        'ticket_subject_categories',
      )
      .leftJoinAndSelect(
        'ticket_subject_categories.ticket_subjects',
        'ticket_subjects',
      )
      .where('project.agency.id = :agencyId', { agencyId });

    if (search) {
      query.where('project.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    const [projects, total] = await query
      .skip((page - 1) * limit_per_page)
      .orderBy(`project.${sort_by}`, sort_order)
      .take(limit_per_page)
      .getManyAndCount();

    return this.paginationService.paginate<ProjectEntity>({
      page,
      total,
      limit_per_page,
      data: projects,
    });
  }

  async findOneById(id: string) {
    const project = await this.projectsRepository.findOneBy({ id });

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    return project;
  }

  async create(body: CreateProjectDTO, agencyId: string) {
    const { name, agents_referents_ids, ticket_subject_categories } = body;

    const agents_referents =
      await this.agentsService.findAllByIds(agents_referents_ids);

    const project = this.projectsRepository.create({
      name,
      agency: { id: agencyId },
      agents_referents,
      ticket_subject_categories,
    });

    return await this.projectsRepository.save(project);
  }

  async delete(id: string) {
    const project = await this.projectsRepository.findOneBy({ id });

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    return await this.projectsRepository.remove(project);
  }
}
