import { readFile } from 'fs/promises';
import { join } from 'path';
import { z } from 'zod';

const ConfigZod = z.object({
  write: z.union([z.literal(false), z.string()]).default('bookmarklet.txt'),
  print: z.boolean().default(false),
  copy: z.boolean().default(true),
  target: z.optional(z.string()),
});

export type Config = z.infer<typeof ConfigZod>;

export const readConfig = async (): Promise<Config> => {
  let rawData: unknown;

  try {
    const file = await readFile(join(process.cwd(), '.bookmarklet.json'), {
      encoding: 'utf-8',
    });

    rawData = JSON.parse(file);
  } catch {
    rawData = {};
  }

  const parsed = ConfigZod.safeParse(rawData);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  return parsed.data;
};
