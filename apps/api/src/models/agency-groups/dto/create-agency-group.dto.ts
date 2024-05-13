import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAgencyGroupDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
