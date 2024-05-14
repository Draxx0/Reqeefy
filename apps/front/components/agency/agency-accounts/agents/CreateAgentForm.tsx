'use client';

import { UserPlus } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../client.index';
import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../server.index';
import { useCreateAgent } from '@/hooks';
import { Agency } from '@reqeefy/types';
import { AGENTS_ROLE } from '@/constants';

export const CreateAgentForm = ({ agency }: { agency: Agency }) => {
  const { form, isPending, onSubmit } = useCreateAgent({
    agencyId: agency.id,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-3">
          Ajouter un agent <UserPlus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un agent</DialogTitle>
          <DialogDescription>
            Remplissez les informations nécessaires pour ajouter un nouvelle
            agent.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">
                    Nom de l&apos;agent
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nom de l'agent"
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
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">
                    Prénom de l&apos;agent
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Prénom de l'agent"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email de l'agent"
                      type="email"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Will be replace by automatically generated password send by email to the agent */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">
                    Mot de passe
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password"
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">Rôle</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full z-10">
                        <SelectValue placeholder="Veuillez sélectionner un rôle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Rôles</SelectLabel>
                          {AGENTS_ROLE.map((role, index) => (
                            <SelectItem key={index} value={role.value}>
                              {role.key}
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

            <FormField
              control={form.control}
              name="agency_group_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">Groupe</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full z-10">
                        <SelectValue placeholder="Veuillez sélectionner un groupe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Groupes</SelectLabel>
                          {agency.agency_groups.map((group, index) => (
                            <SelectItem key={group.id} value={group.id}>
                              {group.name}
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
                Créer l&apos;agent
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
