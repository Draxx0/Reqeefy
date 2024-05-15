import { Agency } from '@reqeefy/types';
import { useMemo } from 'react';

export const useGetCustomers = ({ agency }: { agency: Agency }) => {
  const customers = useMemo(() => {
    const customers = agency.users.filter((user) => user.role === 'customer');

    return customers.map((userAsCustomer) => ({
      first_name: userAsCustomer.first_name,
      last_name: userAsCustomer.last_name,
      email: userAsCustomer.email,
      project: userAsCustomer.customer?.project || null,
    }));
  }, [agency.users]);

  return customers;
};
