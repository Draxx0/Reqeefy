import {
  Button,
  DialogFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/client.index';
import { Input } from '@/components/server.index';
import { useUpdateAgencyGroup } from '@/hooks';
import { AgencyGroupTableData } from '@/types';

export const UpdateAgencyGroupForm = ({
  agencyGroup,
}: {
  agencyGroup: AgencyGroupTableData;
}) => {
  const { form, isPending, onSubmit } = useUpdateAgencyGroup({ agencyGroup });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">Nom du groupe</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom du groupe"
                  type="text"
                  {...field}
                  className="w-full"
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
            Modifier
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
