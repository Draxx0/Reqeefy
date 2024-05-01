'use client';import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Wysywig,
} from '@/components/client.index';
import { useCreateMessage } from '@/hooks';

export const TicketMessageSendForm = ({ ticketId }: { ticketId: string }) => {
  const { form, isPending, onSubmit } = useCreateMessage({
    ticketId: ticketId,
  });

  return (
    <div className="space-y-12">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Wysywig
                    isSubmit={form.formState.isSubmitSuccessful}
                    autofocus={true}
                    placeholder="Répondre..."
                    onChange={(content) => field.onChange(content)}
                  >
                    <Button
                      type="submit"
                      className="w-fit"
                      disabled={!form.formState.isValid}
                      isLoading={isPending}
                    >
                      Envoyer
                    </Button>
                  </Wysywig>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
