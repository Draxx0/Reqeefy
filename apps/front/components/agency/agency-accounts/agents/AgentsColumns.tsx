'use client';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  buttonVariants,
} from '@/components/client.index';
import { Badge } from '@/components/server.index';
import { AgencyAgentTableData } from '@/types';
import { truncateOverTwentyCharacters } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Bolt,
  Copy,
  MoreHorizontal,
  Trash,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { UpdateAgentAgencyGroupForm } from './UpdateAgentAgencyGroupForm';
import { UpdateAgentRoleForm } from './UpdateAgentRoleForm';

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
    id: 'Nom',
    accessorKey: 'last_name',
    header: 'Nom',
    cell: ({ row }) => {
      const agent = row.original;

      return <p>{truncateOverTwentyCharacters(agent.last_name)}</p>;
    },
  },
  {
    id: 'Prénom',
    accessorKey: 'first_name',
    header: 'Prénom',
    cell: ({ row }) => {
      const agent = row.original;

      return <p>{truncateOverTwentyCharacters(agent.first_name)}</p>;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          className="-mx-4"
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
    cell: ({ row }) => {
      const agent = row.original;

      switch (agent.role) {
        case 'agent':
          return <Badge variant="outline">Agent</Badge>;
        case 'distributor':
          return <Badge variant="outline">Distributeur</Badge>;
        case 'superadmin':
          return <Badge variant="outline">Administrateur</Badge>;
        default:
          return <Badge variant="outline">Non assigné</Badge>;
      }
    },
  },
  {
    id: 'Groupe',
    accessorKey: 'group',
    header: 'Groupe',
    cell: ({ row }) => {
      const agent = row.original;

      return agent.group ? (
        <Badge>{truncateOverTwentyCharacters(agent.group.name)}</Badge>
      ) : (
        <Badge>Non assigné</Badge>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    accessorKey: 'actions',
    cell: ({ row }) => {
      const agent = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
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
                navigator.clipboard.writeText(agent.email);
                toast.success('Email copié !');
              }}
              className="flex items-center gap-3"
            >
              Copier l&apos;email
              <Copy className="h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-3"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Modifier le rôle
                    <Bolt className="h-4 w-4" />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Modifier le rôle</DialogTitle>
                    <DialogDescription>
                      Modifier le rôle de l&apos;agent
                    </DialogDescription>
                  </DialogHeader>
                  <UpdateAgentRoleForm agent={agent} />
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="flex items-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Modifier le groupe
                    <Users className="h-4 w-4" />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Modifier le groupe</DialogTitle>
                    <DialogDescription>
                      Modifier le groupe de l&apos;agent
                    </DialogDescription>
                  </DialogHeader>
                  <UpdateAgentAgencyGroupForm agent={agent} />
                </DialogContent>
              </Dialog>
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
