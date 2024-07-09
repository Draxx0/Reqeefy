import z from 'zod';

export const envSchema = z.object({
  POSTGRES_HOST: z.string().trim().min(1),
  POSTGRES_PORT: z.string().trim().min(1),
  POSTGRES_USERNAME: z.string().trim().min(1),
  POSTGRES_PASSWORD: z.string().trim().min(1),
  POSTGRES_DATABASE: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(1),
  PORT: z.string().trim().min(1),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  // MAIL_HOST: z.string().trim().min(1),
  // MAIL_USER: z.string().trim().min(1),
  // MAIL_PASSWORD: z.string().trim().min(1),
  // MAIL_FROM: z.string().trim().min(1),
});
