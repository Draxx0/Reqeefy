import { AGENCY_ACTIVITIES_AREA } from '@/constants';
import { z } from 'zod';

const agencyInformationsSchema = z.object({
  name: z.string().min(1, {
    message: 'Veuillez entrer le nom de votre agence',
  }),
  activity_area: z.enum(AGENCY_ACTIVITIES_AREA),
  website_url: z.string().optional(),
  description: z.string().optional(),
});

export { agencyInformationsSchema };
