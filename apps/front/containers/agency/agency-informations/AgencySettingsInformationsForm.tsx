'use client';

import { useAgencyUpdateInformations } from '@/hooks';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/client.index';
import {
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '../../../components/server.index';
import { Agency } from '@reqeefy/types';
import { AGENCY_ACTIVITIES_AREA } from '@/constants';

export const AgencySettingsInformationsForm = ({
  agency,
}: {
  agency: Agency;
}) => {
  const { form, isPending, onSubmit } = useAgencyUpdateInformations({ agency });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="gap-12 grid grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">
                Nom de l&apos;agence
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom de l'agence"
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
          name="website_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">
                Site web de l&apos;agence
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://reqeefy.com"
                  type="url"
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
          name="activity_area"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">
                Dans quel domaine d’activité exercé vous ?
              </FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full z-10">
                    <SelectValue placeholder="Veuillez sélectionner une activité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Domaines</SelectLabel>
                      {AGENCY_ACTIVITIES_AREA.map((activity) => (
                        <SelectItem key={activity} value={activity}>
                          {activity}
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">
                Description brève de l’agence
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="w-full"
                  placeholder="
                 Reqeefy est une agence de développement web spécialisée dans la création de sites web modernes et performants.
                "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid || !form.formState.isDirty}
          isLoading={isPending}
          className="w-fit"
        >
          Enregistrer mes modifications
        </Button>
      </form>
    </Form>
  );
};
