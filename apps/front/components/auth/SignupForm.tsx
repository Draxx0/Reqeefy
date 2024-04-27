'use client';

import { useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../client.index';
import { useSignup } from '@/hooks';
import {
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '../server.index';
import { AGENCY_ACTIVITIES_AREA, STATIC_PATHS } from '@/constants';
import Link from 'next/link';

export const SignupForm = () => {
  const { form, isPending, onSubmit } = useSignup();
  const [step, setStep] = useState(1);

  return (
    <div className="space-y-12 pb-12">
      <div className="flex items-start justify-center">
        <div className="flex flex-col items-center gap-2 max-w-48 min-w-48">
          <div className="bg-primary-700 p-5 h-8 w-8 rounded-full flex justify-center font-bold items-center text-white">
            <span>1</span>
          </div>

          <p className="text-gray-700 uppercase">Etape 1</p>
          <p className="text-black">Configuration</p>
        </div>

        <span
          className={`w-1/3 h-2 rounded-full ${step === 1 ? 'bg-gray-700' : 'bg-primary-700'} relative top-5`}
        ></span>

        <div className="flex flex-col items-center gap-2 max-w-48 min-w-48 text-center">
          <div
            className={`${step === 1 ? 'bg-gray-700' : 'bg-primary-700'} p-5 h-8 w-8 rounded-full flex justify-center font-bold items-center text-white`}
          >
            <span>2</span>
          </div>

          <p className="text-gray-700 uppercase">Etape 2</p>
          <p className="text-black">Compte administrateur</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          {step === 1 && (
            <>
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
                        placeholder="Reqeefy"
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
                name="website_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">
                      Lien vers votre site web
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">
                      Description brève de l’agence
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                onClick={() => setStep(2)}
                className="w-full"
              >
                Suivant
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">Prénom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">
                      Adresse email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin@reeqefy.com"
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
                    <FormLabel className="text-lg font-bold">
                      Mot de passe
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*******"
                        type="password"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-12">
                <div className="flex justify-between">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant={'outline'}
                    className="w-fit"
                  >
                    Précédent
                  </Button>

                  <Button
                    type="submit"
                    className="w-fit"
                    disabled={!form.formState.isValid}
                    isLoading={isPending}
                  >
                    S&apos;inscrire
                  </Button>
                </div>
                <p className="text-center text-gray-700">
                  En cliquant sur “Créer mon agence”, vous acceptez nos{' '}
                  <Link
                    href={STATIC_PATHS.SERVICE_CONDITION}
                    className="underline"
                  >
                    conditions de service
                  </Link>{' '}
                  et{' '}
                  <Link
                    href={STATIC_PATHS.CONFIDENTIALITY}
                    className="underline"
                  >
                    notre politique de confidentialité.
                  </Link>
                </p>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
};
