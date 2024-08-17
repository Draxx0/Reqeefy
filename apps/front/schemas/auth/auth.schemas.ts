import { AGENCY_ACTIVITIES_AREA } from '@/constants';
import { z } from 'zod';
const loginSchema = z.object({
  email: z.string().email('This is not a valid email.').min(1, {
    message: 'Veuillez entrer une adresse email',
  }),
  password: z.string().min(1, {
    message: 'Veuillez entrer un mot de passe',
  }),
});

const registerSchema = z.object({
  name: z.string().min(1, {
    message: 'Veuillez entrer le nom de votre agence',
  }),
  activity_area: z.enum(AGENCY_ACTIVITIES_AREA),
  website_url: z
    .string()
    .url({
      message: 'Veuillez entrer une URL valide',
    })
    .optional(),
  description: z
    .string()
    .min(1, {
      message: 'Veuillez entrer une description',
    })
    .optional(),
  // USER
  email: z.string().email('This is not a valid email.').min(1, {
    message: 'Veuillez entrer une adresse email',
  }),
  password: z.string().min(1, {
    message: 'Veuillez entrer un mot de passe',
  }),
  first_name: z.string().min(1, {
    message: 'Veuillez entrer votre prénom',
  }),
  last_name: z.string().min(1, {
    message: 'Veuillez entrer votre nom',
  }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Ce n'est pas une adresse email valide").min(1, {
    message: 'Veuillez entrer une adresse email',
  }),
});

const resetPasswordSchema = z
  .object({
    password: z.string().min(1, {
      message: 'Veuillez entrer un mot de passe',
    }),
    password_confirmation: z.string().min(1, {
      message: 'Veuillez confirmer votre mot de passe',
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirm'],
  });

export {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
};
