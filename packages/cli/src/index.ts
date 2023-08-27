#!/usr/bin/env node
import process from 'node:process'

import { Command } from 'commander'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

async function main() {
  const program = new Command()
    .name('shadcn-vue')
    .description('add components and dependencies to your project')
    .version(
      '1.0.0',
      '-v, --version',
      'display the version number',
    )

  program.parse()
}

await main()
