#!/usr/bin/env node

import sade from 'sade';

import { build } from '/@/commands/build';

sade('bookmarklet <file>', true)
  .version('0.1.1')
  .describe('Build a bookmarklet')
  .option('--write', 'The file to write to')
  .option(
    '--print',
    'Whether to print the bookmarklet to terminal (false/true)'
  )
  .option('--copy', 'Whether to copy to clipboard (false/true)')
  .option('--target', 'The target browser')
  .action(build)
  .parse(process.argv);
