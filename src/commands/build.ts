import { build as esbuild } from 'esbuild';
import { bold, green, cyan, dim, magenta } from 'kleur/colors';

import { readConfig } from '/@/config';
import { pbcopy } from '/@/utils';

import { readFile, writeFile } from 'fs/promises';

export const build = async (file: string) => {
  const config = await readConfig();

  const timeStart = performance.now();

  const info = await esbuild({
    entryPoints: [file],
    bundle: true,
    minify: true,
    format: 'iife',

    platform: 'browser',
    target: config.target ?? 'chrome96',

    ...(config.write
      ? { outfile: config.write, write: true }
      : { write: false }),
  });

  console.log(
    'Built in ' + bold(green(`${(performance.now() - timeStart).toFixed(2)}ms`))
  );

  if (!config.write && !info.outputFiles) throw new Error();

  const prefixedOutput =
    'javascript:' +
    (config.write
      ? await readFile(config.write, { encoding: 'utf8' })
      : (info.outputFiles ?? [{ text: '' }])[0].text
    ).trim();

  if (config.write) {
    await writeFile(config.write, prefixedOutput);
    console.log('Wrote to ' + magenta(config.write));
  }

  if (config.print || config.copy) {
    if (config.print) {
      console.log();
      console.log(dim('```js'));
      console.log(cyan(prefixedOutput));
      console.log(dim('```'));
    }

    if (config.copy) {
      await pbcopy(prefixedOutput);
      if (!config.print && !config.write)
        console.log(green('Copied to clipboard!'));
      else console.log(dim('[copied to clipboard]'));
    }
  }
};
