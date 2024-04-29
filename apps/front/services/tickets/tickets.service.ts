import { PaginatedData, Ticket } from '@reqeefy/types';
import { TicketsQueryParams } from '@/types';
import { buildUrlWithQueryParams } from '@/utils';
import { api } from '@/services';
import { createTicketSchema, distributeTicketSchema } from '@/schemas';
import { z } from 'zod';

const getAllByProject = async (
  projectId: string,
  queryParams: TicketsQueryParams
): Promise<PaginatedData<Ticket>> => {
  const apiUrl = `/tickets/project/${projectId}`;
  const url = buildUrlWithQueryParams(apiUrl, queryParams);

  try {
    return await api.get(url);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la récupération des tickets.'
    );
  }
};

const getAllByAgency = async (
  agencyId: string,
  queryParams: TicketsQueryParams
): Promise<PaginatedData<Ticket>> => {
  const apiUrl = `/tickets/agency/${agencyId}`;
  const url = buildUrlWithQueryParams(apiUrl, queryParams);

  try {
    return await api.get(url);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la récupération des tickets.'
    );
  }
};

const create = async (
  data: z.infer<typeof createTicketSchema>,
  projectId: string
) => {
  try {
    return await api.post(`/tickets/project/${projectId}`, data);
  } catch (error) {
    throw new Error('Une erreur est survenue lors de la création du ticket.');
  }
};

const distribute = async (
  data: z.infer<typeof distributeTicketSchema>,
  ticketId: string
) => {
  try {
    return await api.put(`/tickets/${ticketId}/distribute`, data);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la distribution du ticket.'
    );
  }
};

const getOne = async (ticketId: string): Promise<Ticket> => {
  try {
    return await api.get(`/tickets/${ticketId}`);
  } catch (error) {
    throw new Error(
      'Une erreur est survenue lors de la récupération du ticket.'
    );
  }
};

export const ticketsService = {
  getAllByProject,
  getAllByAgency,
  create,
  getOne,
  distribute,
};
