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
} from '../../client.index';
import { Input } from '../../server.index';
import { useCreateAgencyGroup } from '@/hooks';
import { Agency } from '@reqeefy/types';

export const CreateAgencyGroupForm = ({ agency }: { agency: Agency }) => {
  const { form, isPending, onSubmit } = useCreateAgencyGroup({
    agencyId: agency.id,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-3">
          Ajouter un groupe d&apos;agents <UserPlus className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un groupe d&apos;agents</DialogTitle>
          <DialogDescription>
            Remplissez les informations nécessaires pour ajouter un nouveau
            groupe d&apos;agents
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">
                    Nom du groupe d&apos;agents
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nom du groupe d'agents"
                      type="text"
                      {...field}
                      className="w-full"
                    />
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
                Créer le groupe d&apos;agents
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
