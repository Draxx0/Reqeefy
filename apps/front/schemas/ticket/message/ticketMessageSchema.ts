import { z } from 'zod';

const createTicketMessageSchema = z.object({
  content: z.string().min(1, {
    message: 'Veuillez entrer un message',
  }),
  // upload_files
});

export { createTicketMessageSchema };
