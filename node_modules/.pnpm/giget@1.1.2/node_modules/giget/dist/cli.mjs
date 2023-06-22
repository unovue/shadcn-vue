#!/usr/bin/env node
import { relative } from 'node:path';
import mri from 'mri';
import { cyan } from 'colorette';
import { d as downloadTemplate, s as startShell } from './shared/giget.093c29e5.mjs';
import 'node:fs/promises';
import 'node:fs';
import 'tar';
import 'pathe';
import 'defu';
import 'node:stream';
import 'node:child_process';
import 'node:os';
import 'node:util';
import 'node-fetch-native';
import 'https-proxy-agent';

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
  const r = await downloadTemplate(input, {
    dir,
    force: arguments_.force,
    forceClean: arguments_["force-clean"],
    offline: arguments_.offline,
    registry: arguments_.registry,
    cwd: arguments_.cwd,
    auth: arguments_.auth
  });
  console.log(
    `\u2728 Successfully cloned ${cyan(r.name || r.url)} to ${cyan(
      relative(process.cwd(), r.dir)
    )}
`
  );
  if (arguments_.shell) {
    startShell(r.dir);
  }
  process.exit(0);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
