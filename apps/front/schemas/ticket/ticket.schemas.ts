import { z } from 'zod';

const createTicketSchema = z.object({
  title: z.string().min(1, {
    message: 'Veuillez entrer un sujet de discussion',
  }),
  message: z.string().min(1, {
    message: 'Veuillez entrer un message',
  }),
  // upload_files
});

const distributeTicketSchema = z.object({
  agent_groups_ids: z.array(
    z.string().min(1, {
      message: 'Veuillez sélectionner au moins un agent',
    })
  ),
});

export { createTicketSchema, distributeTicketSchema };
