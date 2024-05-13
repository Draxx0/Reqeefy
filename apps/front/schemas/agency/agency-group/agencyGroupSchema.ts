import { z } from 'zod';

const createAgencyGroupSchema = z.object({
  name: z.string().min(1, {
    message: 'Veuillez entrer un prénom',
  }),
});

export { createAgencyGroupSchema };
