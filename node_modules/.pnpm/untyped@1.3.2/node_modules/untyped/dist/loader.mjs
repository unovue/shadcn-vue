import jiti from 'jiti';
import { defu } from 'defu';
import { r as resolveSchema } from './shared/untyped.f1b685ae.mjs';
import babelPluginUntyped from './babel.mjs';
import './shared/untyped.43bfdbed.mjs';
import 'scule';
import '@babel/types';

async function loadSchema(entryPath, options = {}) {
  const _jitiRequire = jiti(
    process.cwd(),
    defu(options.jiti, {
      esmResolve: true,
      interopDefault: true,
      transformOptions: {
        babel: {
          plugins: [[babelPluginUntyped, { experimentalFunctions: true }]]
        }
      }
    })
  );
  const resolvedEntryPath = _jitiRequire.resolve(entryPath);
  const rawSchema = _jitiRequire(resolvedEntryPath);
  const schema = await resolveSchema(rawSchema, options.defaults);
  return schema;
}

export { loadSchema };
