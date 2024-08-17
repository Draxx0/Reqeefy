'use client';
import { useAuthStore } from '@/stores';
import { AgentTicketsList } from './agent/AgentTicketsList';
import { CustomerTicketsList } from './customer/CustomerTicketsList';

export const GeneralTicketsList = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  if (user.role === 'customer') return <CustomerTicketsList />;

  return <AgentTicketsList />;
};
