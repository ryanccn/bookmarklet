import { red } from 'kleur/colors';
import { execa } from 'execa';

export const pbcopy = async (output: string) => {
  const proc = await execa('pbcopy', { input: output });

  if (proc.exitCode !== 0) {
    console.error(red(`\`pbcopy\` exited with code ${proc.exitCode}`));
    process.exit(1);
  }
};
