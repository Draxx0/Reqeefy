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
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  UpdateAgencyGroupForm,
  UserAvatar,
  buttonVariants,
} from '@/components/client.index';
import { Badge, Separator } from '@/components/server.index';
import { AgencyGroupTableData } from '@/types';
import { truncateOverTwentyCharacters } from '@/utils';
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
          className="-mx-4"
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
          {agents.length > 0 ? (
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger>
                <Badge className="cursor-pointer">
                  <Users className="h-4 w-4" />
                  <span>{agents.length}</span>
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <Badge className="line-clamp-1">
                      {truncateOverTwentyCharacters(row.original.name)}
                    </Badge>
                  </div>
                  <Separator className="bg-gray-200" />
                  <ul className="divide-y divide-gray-200">
                    {agents.map((agent) => (
                      <li
                        key={agent.id}
                        className="py-2 flex items-center gap-4"
                      >
                        <UserAvatar user={agent.user} />
                        <div className="flex gap-2 ">
                          <span>
                            {truncateOverTwentyCharacters(
                              agent.user.first_name
                            )}
                          </span>
                          <span>
                            {truncateOverTwentyCharacters(agent.user.last_name)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <Badge>
              <Users className="h-4 w-4" />
              <span>{agents.length}</span>
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
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

            <DropdownMenuItem
              className="capitalize flex items-center gap-3"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="capitalize flex items-center gap-3"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Modifier
                    <Pen className="h-4 w-4" />
                  </div>
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
            </DropdownMenuItem>

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
