#!/usr/bin/env node
'use strict';

const promises = require('node:fs/promises');
const node_path = require('node:path');
const mri = require('mri');

async function main() {
  const args = mri(process.argv.slice(2));
  const [action, entryPath] = args._;
  if (action !== "load" || !entryPath) {
    console.error("Usage: untyped load <entryPath> [--write]");
    process.exit(1);
  }
  const { loadSchema } = await import('./loader.cjs');
  const schema = await loadSchema(entryPath, {});
  if (args.write) {
    const json = JSON.stringify(schema, null, 2);
    const outfile = node_path.resolve(
      process.cwd(),
      args.write === true ? "schema.json" : args.write
    );
    await promises.writeFile(outfile, json);
  } else {
    console.log(schema);
  }
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
