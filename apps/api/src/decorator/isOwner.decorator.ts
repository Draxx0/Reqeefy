import { applyDecorators, UseGuards } from '@nestjs/common';
import { OwnerGuard } from 'src/guards/owner.guard';

export function IsOwner() {
  return applyDecorators(UseGuards(OwnerGuard));
}
