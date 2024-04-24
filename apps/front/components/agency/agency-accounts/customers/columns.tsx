'use client';

import { AgencyCustomerTableData } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<AgencyCustomerTableData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'last_name',
    header: 'Nom',
  },
  {
    accessorKey: 'first_name',
    header: 'Prénom',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'project',
    header: 'Projet',
  },
];
