import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPreferencesEntity } from './entities/user-preferences.entity';
import { Repository } from 'typeorm';
import { CreateUserPreferencesDTO } from './dto/create-user-preferences.dto';
import { UpdateUserPreferencesDTO } from './dto/update-user-preferences.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class UserPreferencesService {
  constructor(
    // REPOSITORIES
    @InjectRepository(UserPreferencesEntity)
    private readonly userPreferencesRepository: Repository<UserPreferencesEntity>,
    // SERVICES
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, body: CreateUserPreferencesDTO) {
    const userPreferences = this.userPreferencesRepository.create({
      ...body,
      user: { id: userId },
    });

    return await this.userPreferencesRepository.save(userPreferences);
  }

  async update(userId: string, body: UpdateUserPreferencesDTO) {
    const userPreferences = await this.userPreferencesRepository.findOneBy({
      id: userId,
    });

    await this.userPreferencesRepository.update(userPreferences, {
      ...body,
      ...userPreferences,
    });

    return this.usersService.findOneById(userId);
  }
}
