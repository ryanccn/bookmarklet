#!/usr/bin/env node

import sade from 'sade';
import { dim } from 'kleur/colors';

import { build } from './build';

sade('bookmarklet <file>', true)
  .version('0.1.3')
  .describe('A CLI for creating bookmarklets')
  .option(
    '--write',
    `The file to write to ${dim('[default: bookmarklet.txt]')}`
  )
  .option(
    '--print',
    `Whether to print the bookmarklet to terminal (false/true) ${dim(
      '[default: false]'
    )}`
  )
  .option(
    '--copy',
    `Whether to copy to clipboard (false/true) ${dim('[default: true]')}`
  )
  .option('--target', `The target browser ${dim('[default: chrome96]')}`)
  .example('blobity.ts --write blobity-bookmarklet.txt --copy')
  .example('removeImages.js --target chrome96')
  .action(build)
  .parse(process.argv);
