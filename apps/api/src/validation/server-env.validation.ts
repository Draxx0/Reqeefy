import { envSchema } from 'src/schemas/server-env.schema';

export const validateEnvVariables = ({
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
  JWT_SECRET,
  PORT,
  NODE_ENV,
}) => {
  const envServer = envSchema.safeParse({
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    POSTGRES_DATABASE,
    JWT_SECRET,
    PORT,
    NODE_ENV,
  });

  if (!envServer.success) {
    console.error(
      "An error occurred while validating the server's environment variables",
    );
    throw new Error('There is an error with the server environment variables');
  }

  console.info('Server environment variables validated successfully');

  return envServer.data;
};
