#!/usr/bin/env node
'use strict';

const node_path = require('node:path');
const mri = require('mri');
const colorette = require('colorette');
const giget = require('./shared/giget.a16f8b31.cjs');
require('node:fs/promises');
require('node:fs');
require('tar');
require('pathe');
require('defu');
require('node:stream');
require('node:child_process');
require('node:os');
require('node:util');
require('node-fetch-native');
require('https-proxy-agent');

async function main() {
  const arguments_ = mri(process.argv.slice(2), {
    boolean: [
      "help",
      "force",
      "force-clean",
      "offline",
      "prefer-offline",
      "shell",
      "verbose"
    ],
    string: ["registry", "cwd", "auth"]
  });
  const input = arguments_._[0];
  const dir = arguments_._[1];
  if (!input || arguments_.help || arguments_.h) {
    console.error(
      "Usage: npx giget@latest <input> [<dir>] [--force] [--force-clean] [--offline] [--prefer-offline] [--shell] [--registry]  [--no-registry] [--verbose] [--cwd] [--auth]"
    );
    process.exit(1);
  }
  if (arguments_.verbose) {
    process.env.DEBUG = process.env.DEBUG || "true";
  }
  const r = await giget.downloadTemplate(input, {
    dir,
    force: arguments_.force,
    forceClean: arguments_["force-clean"],
    offline: arguments_.offline,
    registry: arguments_.registry,
    cwd: arguments_.cwd,
    auth: arguments_.auth
  });
  console.log(
    `\u2728 Successfully cloned ${colorette.cyan(r.name || r.url)} to ${colorette.cyan(
      node_path.relative(process.cwd(), r.dir)
    )}
`
  );
  if (arguments_.shell) {
    giget.startShell(r.dir);
  }
  process.exit(0);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
