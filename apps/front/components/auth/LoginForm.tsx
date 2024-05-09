'use client';

import { useLogin } from '@/hooks';
import {
  Button,
  ButtonLink,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../client.index';
import { Input } from '../server.index';
import Link from 'next/link';

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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Mot de passe</FormLabel>
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
        <div className="flex justify-end">
          <Link href={''} className=" hover:underline text-primary-700 text-sm">
            Mot de passe oublié ?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full"
          // variant={'ghost'}
          disabled={!form.formState.isValid}
          isLoading={isPending}
        >
          Je me connecte
        </Button>
      </form>
    </Form>
  );
};
