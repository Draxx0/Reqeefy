'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  UserAvatar,
  Wysywig,
} from '@/components/client.index';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/server.index';
import { useUpdateMessage } from '@/hooks';
import { useAuthStore } from '@/stores';
import { Message } from '@reqeefy/types';
import { Pen } from 'lucide-react';
import { TicketMessageUploadedFiles } from './TicketMessageUploadedFiles';

export const TicketMessage = ({ message }: { message: Message }) => {
  const user = useAuthStore((state) => state.user);
  const { form, isPending, onSubmit } = useUpdateMessage({
    ticketId: message.ticket.id,
    messageId: message.id,
  });
  if (!user) return null;
  return (
    <div className="space-y-6 p-4 rounded-md shadow-md border border-primary-500 group/message">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-4 items-center">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <UserAvatar user={message.user} />
                </TooltipTrigger>
                <TooltipContent align="center" side="top">
                  <p>
                    {message.user.first_name} {message.user.last_name}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <p>
              {message.user.first_name} {message.user.last_name}
            </p>
          </div>

          {message.updated && (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-gray-900 text-[10px]">(Modifié)</span>
                </TooltipTrigger>
                <TooltipContent align="center" side="top">
                  <p>Ce message a était modifié.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {user.id === message.user.id && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={'ghost'}
                size={'sm'}
                className="gap-2 text-xs text-gray-900 opacity-0 pointer-events-none select-none group-hover/message:opacity-100 group-hover/message:select-auto group-hover/message:pointer-events-auto"
              >
                Modifier
                <Pen className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Modifier mon message</DialogTitle>
                <DialogDescription>
                  Vous pouvez modifier votre message ci-dessous.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Wysywig
                            autofocus={true}
                            setValue={form.setValue}
                            placeholder="Votre message..."
                            onChange={(content) => field.onChange(content)}
                            isSubmit={form.formState.isSubmitSuccessful}
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
                      Modifier le message
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: message.content,
        }}
      ></div>

      {message.upload_files.length > 0 && (
        <>
          <Separator />

          <div className="grid grid-cols-5 gap-4">
            {message.upload_files.map((file) => (
              <TicketMessageUploadedFiles key={file.id} file={file} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
