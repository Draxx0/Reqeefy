import { z } from 'zod';const userSettingsSchema = z.object({
  first_name: z
    .string()
    .min(1, {
      message: 'Veuillez entrer votre prénom',
    })
    .optional(),
  last_name: z
    .string()
    .min(1, {
      message: 'Veuillez entrer votre nom',
    })
    .optional(),
  avatar: z
    .object({
      file_name: z.string(),
      file_url: z.string(),
    })
    .optional(),
  //! TODO: Add email, password and avatar
  // email: z.string().email('This is not a valid email.').min(1, {
  //   message: 'Veuillez entrer une adresse email',
  // }),
  // password: z.string().min(1, {
  //   message: 'Veuillez entrer un mot de passe',
  // }),
});

export { userSettingsSchema };
