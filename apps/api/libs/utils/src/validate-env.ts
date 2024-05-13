import { z } from 'zod';

export function prepareValidateEnv(environment: z.ZodTypeAny) {
  return function validate(config: Record<string, unknown>) {
    const parsedConfig = environment.safeParse(config);

    if (!parsedConfig.success) {
      // @ts-expect-error error is a property of the result
      throw new Error(parsedConfig.error.message);
    }

    return parsedConfig.data;
  };
}
