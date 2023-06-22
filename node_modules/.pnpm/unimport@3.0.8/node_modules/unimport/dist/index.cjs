'use strict';

const context = require('./shared/unimport.9d93ffc9.cjs');
const vueTemplate = require('./shared/unimport.1edcd3b8.cjs');
require('mlly');
require('fs');
require('local-pkg');
require('os');
require('pkg-types');
require('pathe');
require('fs/promises');
require('fast-glob');
require('scule');
require('magic-string');
require('strip-literal');

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

exports.builtinPresets = context.builtinPresets;
exports.createUnimport = context.createUnimport;
exports.resolveBuiltinPresets = context.resolveBuiltinPresets;
exports.resolvePreset = context.resolvePreset;
exports.scanDirExports = context.scanDirExports;
exports.scanExports = context.scanExports;
exports.scanFilesFromDir = context.scanFilesFromDir;
exports.addImportToCode = vueTemplate.addImportToCode;
exports.dedupeImports = vueTemplate.dedupeImports;
exports.defineUnimportPreset = vueTemplate.defineUnimportPreset;
exports.excludeRE = vueTemplate.excludeRE;
exports.getMagicString = vueTemplate.getMagicString;
exports.getString = vueTemplate.getString;
exports.importAsRE = vueTemplate.importAsRE;
exports.matchRE = vueTemplate.matchRE;
exports.normalizeImports = vueTemplate.normalizeImports;
exports.resolveIdAbsolute = vueTemplate.resolveIdAbsolute;
exports.separatorRE = vueTemplate.separatorRE;
exports.stripCommentsAndStrings = vueTemplate.stripCommentsAndStrings;
exports.toExports = vueTemplate.toExports;
exports.toImports = vueTemplate.toImports;
exports.toTypeDeclarationFile = vueTemplate.toTypeDeclarationFile;
exports.toTypeDeclarationItems = vueTemplate.toTypeDeclarationItems;
exports.toTypeReExports = vueTemplate.toTypeReExports;
exports.installGlobalAutoImports = installGlobalAutoImports;
