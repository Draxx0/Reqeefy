'use client';

import { useResetPassword } from '@/hooks';
import { useParams } from 'next/navigation';
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

export const ResetPasswordForm = () => {
  const params = useParams<{ userId: string; token: string }>();

  const { form, isPending, onSubmit } = useResetPassword({
    resetToken: params.token,
    userId: params.userId,
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Nouveau mot de passe</FormLabel>
              <FormControl>
                <Input
                  placeholder="*********"
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
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">
                Confirmer le nouveau mot de passe
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="*********"
                  type="password"
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
