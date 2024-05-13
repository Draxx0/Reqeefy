import { z } from 'zod';

const createProjectSchema = z.object({
  name: z.string().min(1, {
    message: 'Veuillez entrer un nom de projet',
  }),
  description: z.string().min(1, {
    message: 'Veuillez entrer une description',
  }),
  agents_referents_ids: z.array(
    z.string().min(1, {
      message: 'Veuillez sélectionner au moins un agent',
    })
  ),
  //   ticket_subject_categories: z
  //   .array(
  //     z.object({
  //       title: z.string(),
  //       ticket_subjects: z.array(
  //         z.object({
  //           title: z.string(),
  //         })
  //       ),
  //     })
  //   )
  //   .optional(),
  // photo_url: z.string().optional(),
});

export { createProjectSchema };
