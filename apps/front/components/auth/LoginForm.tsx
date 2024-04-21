'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { loginSchema } from '@/schemas';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from '../client.index';
import { Input } from '../server.index';
import { useEffect } from 'react';

export const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // console.log(form.formState.isValid);

  // useEffect(() => {
  //   console.log(form.formState.isValid);
  // }, [form.formState.isValid]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
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
        >
          Je me connecte
        </Button>
      </form>
    </Form>
  );
};
