'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const consola$1 = require('./shared/consola.46fcabd7.cjs');
const basic = require('./shared/consola.2a5d2813.cjs');
require('node:util');
require('node:path');

function createConsola(options = {}) {
  let level = consola$1.LogLevels.info;
  if (process.env.CONSOLA_LEVEL) {
    level = Number.parseInt(process.env.CONSOLA_LEVEL) ?? level;
  }
  const consola2 = consola$1.createConsola({
    level,
    defaults: { level },
    stdout: process.stdout,
    stderr: process.stderr,
    reporters: options.reporters || [new basic.BasicReporter()],
    ...options
  });
  return consola2;
}
const consola = createConsola();

exports.Consola = consola$1.Consola;
exports.LogLevels = consola$1.LogLevels;
exports.LogTypes = consola$1.LogTypes;
exports.consola = consola;
exports.createConsola = createConsola;
exports.default = consola;
