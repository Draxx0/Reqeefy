import { z } from 'zod';

const createCustomerSchema = z.object({
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
  project_id: z.string().min(1, {
    message: 'Veuillez sélectionner un projet',
  }),
});

export { createCustomerSchema };
