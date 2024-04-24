import { z } from 'zod';

const userSettingsSchema = z.object({
  first_name: z.string().min(1, {
    message: 'Veuillez entrer votre prénom',
  }),
  last_name: z.string().min(1, {
    message: 'Veuillez entrer votre nom',
  }),
  //! TODO: Add email, password and avatar
  // email: z.string().email('This is not a valid email.').min(1, {
  //   message: 'Veuillez entrer une adresse email',
  // }),
  // password: z.string().min(1, {
  //   message: 'Veuillez entrer un mot de passe',
  // }),
});

export { userSettingsSchema };
