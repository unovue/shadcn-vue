import { promises } from 'fs';
import { createUnplugin } from 'unplugin';
import { createFilter } from '@rollup/pluginutils';
import MagicString from 'magic-string';
import { e as createUnimport } from './shared/unimport.214a6853.mjs';
import 'mlly';
import './shared/unimport.4575fe85.mjs';
import 'pathe';
import 'strip-literal';
import 'local-pkg';
import 'os';
import 'pkg-types';
import 'fs/promises';
import 'fast-glob';
import 'scule';

const defaultIncludes = [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/];
const defaultExcludes = [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/];
function toArray(x) {
  return x == null ? [] : Array.isArray(x) ? x : [x];
}
const unplugin = createUnplugin((options = {}) => {
  const ctx = createUnimport(options);
  const filter = createFilter(
    toArray(options.include || []).length ? options.include : defaultIncludes,
    options.exclude || defaultExcludes
  );
  const dts = options.dts === true ? "unimport.d.ts" : options.dts;
  const {
    autoImport = true
  } = options;
  return {
    name: "unimport",
    enforce: "post",
    transformInclude(id) {
      return filter(id);
    },
    async transform(code, id) {
      const s = new MagicString(code);
      await ctx.injectImports(s, id, {
        autoImport
      });
      if (!s.hasChanged()) {
        return;
      }
      return {
        code: s.toString(),
        map: s.generateMap()
      };
    },
    async buildStart() {
      await ctx.init();
      if (dts) {
        return promises.writeFile(dts, await ctx.generateTypeDeclarations(), "utf-8");
      }
    }
  };
});

export { unplugin as default, defaultExcludes, defaultIncludes };
