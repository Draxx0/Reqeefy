import { applyDecorators, UseGuards } from '@nestjs/common';
import { OwnerGuard } from '../guards/owner.guard';

export function IsOwner() {
  return applyDecorators(UseGuards(OwnerGuard));
}
