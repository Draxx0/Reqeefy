'use client';

import { useDistributeTicket, useGetAgencyGroups } from '@/hooks';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../client.index';
import Multiselect from 'multiselect-react-dropdown';
import { useAuthStore } from '@/stores';
import { useEffect, useState } from 'react';

export const DistributeTicketForm = ({ ticketId }: { ticketId: string }) => {
  const user = useAuthStore((state) => state.user);
  const [selectedAgencyGroups, setSelectedAgencyGroyps] = useState<
    { key: string; value: string }[] | null
  >(null);

  const { form, isPending, onSubmit } = useDistributeTicket({
    ticketId,
  });
  const {
    data: agencyGroups,
    isLoading,
    isError,
  } = useGetAgencyGroups({
    agency: user?.agency,
  });

  const handleAgencyGroupSelection = (
    selectedList: { key: string; value: string }[]
  ) => {
    setSelectedAgencyGroyps(selectedList);
    const agency_group_ids = selectedList.map((group) => group.value);
    form.setValue('agent_groups_ids', agency_group_ids as never[]);
  };

  useEffect(() => {
    console.log(form.getValues());
  }, [form.watch()]);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="agent_groups_ids"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">
                Assigner à un groupe d&apos;agents
              </FormLabel>
              <FormControl>
                {isLoading || !agencyGroups ? (
                  <p>Chargement...</p>
                ) : (
                  <Multiselect
                    {...field}
                    className="bg-white py-1 px-2 text-sm transition-all ease-in-out duration-300 placeholder:transition placeholder:ease-in-out placeholder:duration-300 border-2 border-gray-700 rounded-md outline-none font-bold focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 disabled:pointer-events-none disabled:opacity-30 disabled:select-none"
                    options={agencyGroups.map((group) => ({
                      key: group.name,
                      value: group.id,
                    }))}
                    selectedValues={selectedAgencyGroups}
                    onSelect={handleAgencyGroupSelection}
                    onRemove={handleAgencyGroupSelection}
                    displayValue="key"
                    placeholder="Sélectionner"
                    emptyRecordMsg="Aucun groupe d'agents restants"
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-fit"
          disabled={!form.formState.isValid}
          isLoading={isPending}
        >
          Distribuer
        </Button>
      </form>
    </Form>
  );
};
