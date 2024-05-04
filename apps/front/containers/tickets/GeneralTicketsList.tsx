'use client';import { useAuthStore } from '@/stores';
import { CustomerTicketsList } from './customer/CustomerTicketsList';
import { AgentTicketsList } from './agent/AgentTicketsList';

export const GeneralTicketsList = () => {
  const user = useAuthStore((state) => state.user);

  //! Find better way to handle this in the whole project
  if (!user) return null;

  if (user.role === 'customer') return <CustomerTicketsList />;

  return <AgentTicketsList />;
};
