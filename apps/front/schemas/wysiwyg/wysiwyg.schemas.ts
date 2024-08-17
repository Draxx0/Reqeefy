import { z } from 'zod';

const createLinkSchema = z.object({
  text: z.string().min(1, {
    message: 'Veuillez entrer un texte',
  }),
  url: z.string().url({
    message: 'Veuillez entrer une URL valide',
  }),
});

export { createLinkSchema };

export type CreateLinkSchemaType = z.infer<typeof createLinkSchema>;
