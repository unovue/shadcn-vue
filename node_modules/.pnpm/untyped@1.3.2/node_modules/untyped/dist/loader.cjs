'use strict';

const jiti = require('jiti');
const defu = require('defu');
const schema = require('./shared/untyped.a8f090d5.cjs');
const babel = require('./babel.cjs');
require('./shared/untyped.07613105.cjs');
require('scule');
require('@babel/types');

async function loadSchema(entryPath, options = {}) {
  const _jitiRequire = jiti(
    process.cwd(),
    defu.defu(options.jiti, {
      esmResolve: true,
      interopDefault: true,
      transformOptions: {
        babel: {
          plugins: [[babel, { experimentalFunctions: true }]]
        }
      }
    })
  );
  const resolvedEntryPath = _jitiRequire.resolve(entryPath);
  const rawSchema = _jitiRequire(resolvedEntryPath);
  const schema$1 = await schema.resolveSchema(rawSchema, options.defaults);
  return schema$1;
}

exports.loadSchema = loadSchema;
