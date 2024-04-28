'use client';

import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/client.index';
import { Badge } from '@/components/server.index';
import { AgencyAgentTableData } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Bolt,
  Copy,
  EyeOff,
  MoreHorizontal,
  Trash,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';

export const agentsColumns: ColumnDef<AgencyAgentTableData>[] = [
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
    id: 'Rôle',
    accessorKey: 'role',
    header: 'Rôle',
  },
  {
    id: 'Groupe',
    accessorKey: 'group',
    header: 'Groupe',
    cell: ({ row }) => {
      const agent = row.original;

      console.log(agent);

      return agent.groups.length > 0 ? (
        <div className="flex items-center gap-2">
          {agent.groups.map((group) => (
            <Badge key={group.id} variant="outline">
              {group.name}
            </Badge>
          ))}
        </div>
      ) : (
        <span>Aucun</span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const agent = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" type="button" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(agent.email);
                toast.success('Email copié !');
              }}
              className="flex items-center gap-3"
            >
              Copier l&apos;email
              <Copy className="h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-3">
              Modifier le rôle
              <Bolt className="h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3">
              Modifier le groupe
              <Users className="h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3">
              Supprimer l&apos;agent
              <Trash className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
