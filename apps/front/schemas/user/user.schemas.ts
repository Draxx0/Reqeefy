import { AGENTS_ROLES_VALUES } from '@/constants';
import { z } from 'zod';

const userAgentRoleSchema = z.object({
  role: z.enum(AGENTS_ROLES_VALUES),
});

export { userAgentRoleSchema };
