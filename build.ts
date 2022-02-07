import { build } from 'esbuild';
import { bold, green, cyan, dim, red, magenta } from 'kleur/colors';

import { readFile, writeFile } from 'fs/promises';
import { execa } from 'execa';

import config from './_config';

const pbcopy = async (output: string) => {
  const proc = await execa('pbcopy', { input: output });

  if (proc.exitCode !== 0) {
    console.error(red(`\`pbcopy\` exited with code ${proc.exitCode}`));
    process.exit(1);
  }
};

(async () => {
  const timeStart = performance.now();

  const info = await build({
    entryPoints: ['index.ts'],
    bundle: true,
    minify: true,
    format: 'iife',

    platform: 'browser',
    target: 'chrome96',

    ...(config.write
      ? { outfile: config.write, write: true }
      : { write: false }),
  });

  console.log(
    'Built in ' + bold(green(`${(performance.now() - timeStart).toFixed(2)}ms`))
  );

  const prefixedOutput =
    'javascript:' +
    (config.write
      ? await readFile(config.write, { encoding: 'utf8' })
      : info.outputFiles[0].text
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
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
