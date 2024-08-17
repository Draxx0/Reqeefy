import { createTicketMessageSchema } from '@/schemas';
import { Message } from '@reqeefy/types';
import { z } from 'zod';
import { api } from '../common/api';

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

const update = async (
  data: z.infer<typeof createTicketMessageSchema>,
  messageId: string
): Promise<Message> => {
  try {
    return await api.put(`/messages/${messageId}`, data);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la modification du message.'
    );
  }
};

export const messagesService = {
  create,
  update,
};
