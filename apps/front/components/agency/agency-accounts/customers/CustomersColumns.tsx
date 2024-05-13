'use client';
import {
  Button,
  ButtonLink,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  buttonVariants,
} from '@/components/client.index';
import { Badge } from '@/components/server.index';
import { STATIC_PATHS } from '@/constants';
import { AgencyCustomerTableData } from '@/types';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Copy,
  FolderGit2,
  MoreHorizontal,
  Trash,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export const customersColumns: ColumnDef<AgencyCustomerTableData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'ID',
    accessorKey: 'id',
    header: 'ID',
  },
  {
    id: 'Nom',
    accessorKey: 'last_name',
    header: 'Nom',
  },
  {
    id: 'Prénom',
    accessorKey: 'first_name',
    header: 'Prénom',
  },
  {
    id: 'Email',
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: 'Projet',
    accessorKey: 'project',
    header: 'Projet',
    cell: ({ row }) => {
      const customer = row.original;

      if (customer.project) {
        return (
          <Badge variant="outline" className="capitalize">
            {customer.project.name}
          </Badge>
        );
      }

      return 'Aucun';
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className={buttonVariants({
                variant: 'ghost',
              })}
            >
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(customer.email);
                toast.success('Email copié !');
              }}
              className="flex items-center gap-3"
            >
              Copier l&apos;email
              <Copy className="h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {customer.project ? (
              <DropdownMenuItem>
                <Link
                  href={`${STATIC_PATHS.PROJECTS_SETTINGS}/${customer.project.id}`}
                  className='className="capitalize flex items-center gap-3'
                >
                  Consulter le projet
                  <FolderGit2 className="h-4 w-4" />
                </Link>
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem className="capitalize flex items-center gap-3">
              Supprimer le client
              <Trash className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
