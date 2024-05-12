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
  Wysywig,
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
                <Wysywig
                  autofocus={false}
                  setValue={form.setValue}
                  placeholder="Ecrire mon premier message"
                  onChange={(content) => field.onChange(content)}
                  isSubmit={form.formState.isSubmitSuccessful}
                >
                  <></>
                </Wysywig>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full justify-end flex">
          <Button
            type="submit"
            className="w-fit"
            disabled={!form.formState.isValid}
            isLoading={isPending}
          >
            Envoyer
          </Button>
        </div>
        {/* ADD DOCUMENT ATTACHED */}
      </form>
    </Form>
  );
};
