import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UploadFilesService } from './upload-files.service';

@Controller('upload-files')
@UseGuards(JwtAuthGuard)
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}
}
