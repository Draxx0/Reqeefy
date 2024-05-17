'use client';

import { useForgotPassword } from '@/hooks';
import { Button } from '../client.index';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '../server.index';

export const ForgotPasswordForm = () => {
  const { form, isPending, onSubmit } = useForgotPassword();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Adresse email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Adresse email"
                  type="email"
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
          className="w-full"
          disabled={!form.formState.isValid}
          isLoading={isPending}
        >
          Réinitialiser le mot de passe
        </Button>
      </form>
    </Form>
  );
};
