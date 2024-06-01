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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/server.index';
import { AGENTS_ROLE } from '@/constants';
import { useUpdateUserAgentRole } from '@/hooks';
import { AgencyAgentTableData } from '@/types';

export const UpdateAgentRoleForm = ({
  agent,
}: {
  agent: AgencyAgentTableData;
}) => {
  const { form, isPending, onSubmit } = useUpdateUserAgentRole({ agent });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">
                Rôle de l&apos;agent
              </FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full z-10">
                    <SelectValue placeholder="Veuillez sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Rôles</SelectLabel>
                      {AGENTS_ROLE.map((role, index) => (
                        <SelectItem key={index} value={role.value}>
                          {role.key}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
