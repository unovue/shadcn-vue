import { L as LogLevels, c as createConsola$1 } from './shared/consola.ce5c7a59.mjs';
export { C as Consola, a as LogTypes } from './shared/consola.ce5c7a59.mjs';
import { B as BasicReporter } from './shared/consola.3c86be48.mjs';
import 'node:util';
import 'node:path';

function createConsola(options = {}) {
  let level = LogLevels.info;
  if (process.env.CONSOLA_LEVEL) {
    level = Number.parseInt(process.env.CONSOLA_LEVEL) ?? level;
  }
  const consola2 = createConsola$1({
    level,
    defaults: { level },
    stdout: process.stdout,
    stderr: process.stderr,
    reporters: options.reporters || [new BasicReporter()],
    ...options
  });
  return consola2;
}
const consola = createConsola();

export { LogLevels, consola, createConsola, consola as default };
