'use client';
import {
  Button,
  DialogFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/client.index';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/server.index';
import { Spinner } from '@/containers/loading-state/common/Spinner';
import { useGetAgencyGroups, useUpdateUserAgentAgencyGroup } from '@/hooks';
import { useAuthStore } from '@/stores';
import { AgencyAgentTableData } from '@/types';
import { Bomb } from 'lucide-react';

export const UpdateAgentAgencyGroupForm = ({
  agent,
}: {
  agent: AgencyAgentTableData;
}) => {
  const user = useAuthStore((state) => state.user);

  const {
    data: agencyGroups,
    isLoading,
    isError,
    refetch,
  } = useGetAgencyGroups({
    agency: user?.agency,
  });

  const { form, isPending, onSubmit } = useUpdateUserAgentAgencyGroup({
    agent,
  });

  if (isLoading && !agencyGroups) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError && !agencyGroups) {
    return (
      <div className="flex gap-4 justify-center">
        <div className="flex items-center gap-2">
          <Bomb className="size-4 text-red-500" />
          <p className=" text-sm font-bold text-red-500">
            Une erreur est survenue lors de la récupération des groupes
            d&apos;agent.
          </p>
        </div>

        <Button
          className="w-fit"
          onClick={(e) => {
            if (!e) return;

            e.preventDefault();
            e.stopPropagation();
            refetch();
          }}
          type="button"
        >
          Réessayer
        </Button>
      </div>
    );
  }

  if (!agencyGroups) {
    return null;
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="agency_group_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">
                Groupe d&apos;agent
              </FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full z-10">
                    <SelectValue placeholder="Veuillez sélectionner un groupe d'agent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Groupes</SelectLabel>
                      {agencyGroups.map((role, index) => (
                        <SelectItem key={index} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            type="submit"
            className="w-fit"
            disabled={!form.formState.isValid}
            isLoading={isPending}
          >
            Modifier
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
