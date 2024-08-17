import { z } from 'zod';

const createAgencyGroupSchema = z.object({
  name: z.string().min(1, {
    message: 'Veuillez entrer nom de groupe',
  }),
});

const updateAgencyGroupSchema = z.object({
  name: z.string().min(1, {
    message: 'Veuillez entrer un nom de groupe',
  }),
});

export { createAgencyGroupSchema, updateAgencyGroupSchema };
