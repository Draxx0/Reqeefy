import { AGENTS_ROLES_VALUES } from '@/constants';
import { z } from 'zod';

const createAgentSchema = z.object({
  first_name: z.string().min(1, {
    message: 'Veuillez entrer un prénom',
  }),
  last_name: z.string().min(1, {
    message: 'Veuillez entrer un nom',
  }),
  email: z.string().email().min(1, {
    message: 'Veuillez entrer un email',
  }),
  password: z.string().min(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  }),
  role: z.enum(AGENTS_ROLES_VALUES),
  agency_group_id: z.string().min(1, {
    message: "Veuillez sélectionner un groupe d'agence",
  }),
});

const updateAgentAgencyGroupSchema = z.object({
  agency_group_id: z.string().min(1, {
    message: "Veuillez sélectionner un groupe d'agence",
  }),
});

export { createAgentSchema, updateAgentAgencyGroupSchema };
