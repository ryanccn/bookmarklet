#!/usr/bin/env node

import sade from 'sade';

import { build } from '/@/commands/build';

sade('bookmarklet')
  .version('0.0.3')
  .command('build <file>')
  .describe('Build a bookmarklet')
  .action(build)
  .parse(process.argv);
