import { z } from 'zod';
import { api } from '../common/api';
import { createTicketMessageSchema } from '@/schemas';
import { Message } from '@reqeefy/types';

const create = async (
  data: z.infer<typeof createTicketMessageSchema>,
  ticketId: string
): Promise<Message> => {
  try {
    return await api.post(`/tickets/${ticketId}/messages`, data);
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la création du ticket.');
  }
};

export const messagesService = {
  create,
};
