#!/usr/bin/env node

import sade from 'sade';

import { build } from '/@/commands/build';

sade('bookmarklet <file>', true)
  .version('0.1.0')
  .describe('Build a bookmarklet')
  .option('--write', 'The file to write to')
  .option('--print', 'Whether to print the bookmarklet to terminal (0/1)')
  .option('--copy', 'Whether to copy to clipboard (0/1)')
  .option('--target', 'The target browser')
  .action(build)
  .parse(process.argv);
