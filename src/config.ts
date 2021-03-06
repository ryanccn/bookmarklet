import { readFile } from 'fs/promises';
import { join } from 'path';
import { z } from 'zod';

const ConfigZod = z.object({
  write: z.union([z.literal(false), z.string()]).default('bookmarklet.txt'),
  print: z.boolean().default(false),
  copy: z.boolean().default(true),
  target: z.string().default('chrome96'),
});

export type Config = z.infer<typeof ConfigZod>;

const ConfigOptionsZod = z.object({
  write: z.optional(z.string()),
  print: z.optional(z.union([z.literal('true'), z.literal('false')])),
  copy: z.optional(z.union([z.literal('true'), z.literal('false')])),
  target: z.optional(z.string()),
});

export type ConfigOptions = z.infer<typeof ConfigOptionsZod>;

export const readConfig = async (options?: ConfigOptions): Promise<Config> => {
  let rawData: unknown;

  try {
    rawData = (await import(join(process.cwd(), '.bookmarklet.mjs'))).default;
  } catch {
    try {
      const file = await readFile(join(process.cwd(), '.bookmarklet.json'), {
        encoding: 'utf-8',
      });

      rawData = JSON.parse(file);
    } catch {
      rawData = {};
    }
  }

  const parsed = ConfigZod.safeParse(rawData);

  if (!parsed.success) {
    throw new Error(parsed.error.message);
  }

  const parsedOptionsRet = ConfigOptionsZod.safeParse(options);

  if (!parsedOptionsRet.success) {
    throw new Error(parsedOptionsRet.error.message);
  }

  const parsedOptions = parsedOptionsRet.data;

  const doubleParsedOptions = {
    ...(parsedOptions.write ? { write: parsedOptions.write } : {}),
    ...(parsedOptions.print ? { print: parsedOptions.print === 'true' } : {}),
    ...(parsedOptions.copy ? { copy: parsedOptions.copy === 'true' } : {}),
    ...(parsedOptions.target ? { write: parsedOptions.target } : {}),
  };

  return Object.assign(parsed.data, doubleParsedOptions);
};
