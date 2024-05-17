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
  UpdateAgencyGroupForm,
  buttonVariants,
} from '@/components/client.index';
import { AgencyGroupTableData } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pen, Trash, Users } from 'lucide-react';

export const agencyGroupsColumns: ColumnDef<AgencyGroupTableData>[] = [
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
    id: 'Nom du groupe',
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nom du groupe
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: 'Agents',
    accessorKey: 'agents',
    header: 'Agents',
    cell: ({ row }) => {
      const agents = row.original.agents;

      return (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{agents.length}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const agencyGroup = row.original;

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
            <DropdownMenuSeparator />
            <Dialog>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  className="capitalize flex items-center gap-3"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Modifier
                  <Pen className="h-4 w-4" />
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Modifier un groupe</DialogTitle>
                  <DialogDescription>
                    Modifiez le nom du groupe
                  </DialogDescription>
                </DialogHeader>
                <UpdateAgencyGroupForm agencyGroup={agencyGroup} />
              </DialogContent>
            </Dialog>
            <DropdownMenuItem className="capitalize flex items-center gap-3">
              Supprimer
              <Trash className="h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
