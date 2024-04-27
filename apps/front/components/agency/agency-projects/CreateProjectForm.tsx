'use client';

import { useCreateProject } from '@/hooks';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../client.index';
import Multiselect from 'multiselect-react-dropdown';
import { Input, Textarea } from '../../server.index';
import { useEffect, useState } from 'react';
import { useGetAgents } from '@/hooks/user';
import { Agency } from '@reqeefy/types';

export const CreateProjectForm = ({ agency }: { agency: Agency }) => {
  const { form, isPending, onSubmit } = useCreateProject({
    agencyId: agency.id,
  });
  const [selectedAgents, setSelectedAgents] = useState<
    { key: string; value: string }[] | null
  >(null);
  const agents = useGetAgents({ agency });

  const handleAgentsSelection = (
    selectedList: { key: string; value: string }[]
  ) => {
    setSelectedAgents(selectedList);
    const agents_ids = selectedList.map((agent) => agent.value);
    form.setValue('agents_referents_ids', agents_ids as never[]);
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">Nom du projet</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom du projet"
                  type="text"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">
                Description du projet
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description du projet"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agents_referents_ids"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">
                Agents référents
              </FormLabel>
              <FormControl>
                <Multiselect
                  {...field}
                  className="bg-white py-1 px-2 text-sm transition-all ease-in-out duration-300 placeholder:transition placeholder:ease-in-out placeholder:duration-300 border-2 border-gray-700 rounded-md outline-none font-bold focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 disabled:pointer-events-none disabled:opacity-30 disabled:select-none"
                  options={agents.map((agent) => ({
                    key: agent.first_name + ' ' + agent.last_name,
                    value: agent.id,
                  }))}
                  selectedValues={selectedAgents}
                  onSelect={handleAgentsSelection}
                  onRemove={handleAgentsSelection}
                  displayValue="key"
                  placeholder="Sélectionner"
                  emptyRecordMsg="Aucun agents restants"
                />
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
          Créer
        </Button>
      </form>
    </Form>
  );
};
