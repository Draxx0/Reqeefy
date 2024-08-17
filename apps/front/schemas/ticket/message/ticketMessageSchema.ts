import { z } from 'zod';

const createTicketMessageSchema = z.object({
  content: z.string().min(1, {
    message: 'Veuillez entrer un message',
  }),
  uploadedFiles: z.array(z.instanceof(File)).optional(),
});

const updateTicketMessageSchema = z.object({
  content: z.string().min(1, {
    message: 'Veuillez entrer un message',
  }),
  // uploadedFiles: z.array(z.instanceof(File)).optional(),
});

export { createTicketMessageSchema, updateTicketMessageSchema };

export type CreateTicketMessage = z.infer<typeof createTicketMessageSchema>;
export type UpdateTicketMessage = z.infer<typeof updateTicketMessageSchema>;
