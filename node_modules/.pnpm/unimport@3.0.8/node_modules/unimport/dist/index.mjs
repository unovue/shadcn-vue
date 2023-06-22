export { b as builtinPresets, e as createUnimport, a as resolveBuiltinPresets, r as resolvePreset, c as scanDirExports, d as scanExports, s as scanFilesFromDir } from './shared/unimport.214a6853.mjs';
export { l as addImportToCode, b as dedupeImports, d as defineUnimportPreset, e as excludeRE, k as getMagicString, j as getString, i as importAsRE, m as matchRE, n as normalizeImports, r as resolveIdAbsolute, s as separatorRE, a as stripCommentsAndStrings, c as toExports, t as toImports, g as toTypeDeclarationFile, f as toTypeDeclarationItems, h as toTypeReExports } from './shared/unimport.4575fe85.mjs';
import 'mlly';
import 'fs';
import 'local-pkg';
import 'os';
import 'pkg-types';
import 'pathe';
import 'fs/promises';
import 'fast-glob';
import 'scule';
import 'magic-string';
import 'strip-literal';

async function installGlobalAutoImports(imports, options = {}) {
  const {
    globalObject = globalThis,
    overrides = false
  } = options;
  imports = Array.isArray(imports) ? imports : await imports.getImports();
  await Promise.all(
    imports.map(async (i) => {
      if (i.disabled || i.type) {
        return;
      }
      const as = i.as || i.name;
      if (overrides || !(as in globalObject)) {
        const module = await import(i.from);
        globalObject[as] = module[i.name];
      }
    })
  );
  return globalObject;
}

export { installGlobalAutoImports };
