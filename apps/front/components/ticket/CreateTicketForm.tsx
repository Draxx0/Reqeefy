'use client';

import { useCreateTicket } from '@/hooks';
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

export const CreateTicketForm = ({ projectId }: { projectId: string }) => {
  const { form, isPending, onSubmit } = useCreateTicket({
    projectId,
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">
                Sujet de la discussion
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Sujet de la discussion"
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">Votre message</FormLabel>
              <FormControl>
                {/* TIPTAP || QUILL ? WYSIWYG EDITOR */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ADD DOCUMENT ATTACHED */}
        <Button
          type="submit"
          className="w-fit"
          disabled={!form.formState.isValid}
          isLoading={isPending}
        >
          Envoyer
        </Button>
      </form>
    </Form>
  );
};
