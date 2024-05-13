import { PartialType } from '@nestjs/mapped-types';
import { CreateAgentDTO } from './create-agent.dto';

export class UpdateAgentDto extends PartialType(CreateAgentDTO) {}
