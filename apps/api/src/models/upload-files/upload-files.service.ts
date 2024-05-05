import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadFileEntity } from './entities/upload-file.entity';
import {
  CreateAgencyUploadFileDto,
  CreateUserUploadFileDto,
} from './dto/create-upload-file.dto';

@Injectable()
export class UploadFilesService {
  constructor(
    @InjectRepository(UploadFileEntity)
    private readonly uploadFileRepository: Repository<UploadFileEntity>,
  ) {}

  createAgencyFile(createAgencyUploadFileDto: CreateAgencyUploadFileDto) {
    const { file_name, file_url, agencyId } = createAgencyUploadFileDto;

    const uploadFile = this.uploadFileRepository.create({
      file_name,
      file_url,
      agency: { id: agencyId },
    });

    return this.uploadFileRepository.save(uploadFile);
  }

  createUserFile(
    createUserUploadFileDto: CreateUserUploadFileDto,
    userId: string,
  ) {
    const { file_name, file_url } = createUserUploadFileDto;

    const uploadFile = this.uploadFileRepository.create({
      file_name,
      file_url,
      user: { id: userId },
    });

    return this.uploadFileRepository.save(uploadFile);
  }

  async findOneById(id: string) {
    const uploadFile = await this.uploadFileRepository
      .createQueryBuilder('uploadFile')
      .where('uploadFile.id = :id', { id })
      .getOne();

    return uploadFile;
  }

  delete(id: string) {
    return this.uploadFileRepository.delete({ id });
  }
}
