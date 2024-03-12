import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('upload-files')
@UseGuards(JwtAuthGuard)
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  @Post()
  create(@Body() createUploadFileDto: CreateUploadFileDto) {
    return this.uploadFilesService.create(createUploadFileDto);
  }

  @Get()
  findAll() {
    return this.uploadFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadFilesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUploadFileDto: UpdateUploadFileDto,
  ) {
    return this.uploadFilesService.update(+id, updateUploadFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadFilesService.remove(+id);
  }
}
