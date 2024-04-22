'use client';

import { useLogin } from "@/hooks/auth/useLogin";
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

export const LoginForm = () => {

  const { form, isPending, onSubmit } = useLogin();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">Adresse email</FormLabel>
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-bold">Mot de passe</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mot de passe"
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
          Je me connecte
        </Button>
      </form>
    </Form>
  );
};
