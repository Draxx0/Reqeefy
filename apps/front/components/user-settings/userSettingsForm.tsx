'use client';

import { useUserSettings } from '@/hooks';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../client.index';
import { Input } from '../server.index';

export const UserSettingsForm = () => {
  const { form, isPending, onSubmit } = useUserSettings();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">Prénom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Votre prénom"
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
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">Nom</FormLabel>
              <FormControl>
                <Input
                  placeholder="Votre nom"
                  type="text"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid || !form.formState.isDirty}
          isLoading={isPending}
        >
          Enregistrer mes modifications
        </Button>
      </form>
    </Form>
  );
};
