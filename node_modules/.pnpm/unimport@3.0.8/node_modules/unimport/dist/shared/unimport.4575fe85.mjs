import { isAbsolute, relative } from 'pathe';
import { resolvePath, findStaticImports, parseStaticImport } from 'mlly';
import MagicString from 'magic-string';
import { stripLiteral } from 'strip-literal';

const excludeRE = [
  // imported/exported from other module
  /\b(import|export)\b([\s\w_$*{},]+)\sfrom\b/gs,
  // defined as function
  /\bfunction\s*([\w_$]+?)\s*\(/gs,
  // defined as class
  /\bclass\s*([\w_$]+?)\s*{/gs,
  // defined as local variable
  /\b(?:const|let|var)\s+?(\[.*?\]|\{.*?\}|.+?)\s*?[=;\n]/gs
];
const importAsRE = /^.*\sas\s+/;
const separatorRE = /[,[\]{}\n]|\bimport\b/g;
const matchRE = /(^|\.\.\.|(?:\bcase|\?)\s+|[^\w_$\/)])([\w_$]+)\s*(?=[.()[\]}:;?+\-*&|`<>,\n]|\b(?:instanceof|in)\b|$)/g;
const regexRE = /\/[^\s]*?(?<!\\)(?<!\[[^\]]*)\/[gimsuy]*/g;
function stripCommentsAndStrings(code) {
  return stripLiteral(code).replace(regexRE, 'new RegExp("")');
}
function defineUnimportPreset(preset) {
  return preset;
}
function toImports(imports, isCJS = false) {
  const map = toImportModuleMap(imports);
  return Object.entries(map).flatMap(([name, importSet]) => {
    const entries = [];
    const imports2 = Array.from(importSet).filter((i) => {
      if (!i.name || i.as === "") {
        entries.push(
          isCJS ? `require('${name}');` : `import '${name}';`
        );
        return false;
      } else if (i.name === "default") {
        entries.push(
          isCJS ? `const { default: ${i.as} } = require('${name}');` : `import ${i.as} from '${name}';`
        );
        return false;
      } else if (i.name === "*") {
        entries.push(
          isCJS ? `const ${i.as} = require('${name}');` : `import * as ${i.as} from '${name}';`
        );
        return false;
      }
      return true;
    });
    if (imports2.length) {
      const importsAs = imports2.map((i) => stringifyImportAlias(i, isCJS));
      entries.push(
        isCJS ? `const { ${importsAs.join(", ")} } = require('${name}');` : `import { ${importsAs.join(", ")} } from '${name}';`
      );
    }
    return entries;
  }).join("\n");
}
function dedupeImports(imports, warn) {
  const map = /* @__PURE__ */ new Map();
  const indexToRemove = /* @__PURE__ */ new Set();
  imports.filter((i) => !i.disabled).forEach((i, idx) => {
    const name = i.as ?? i.name;
    if (!map.has(name)) {
      map.set(name, idx);
      return;
    }
    const other = imports[map.get(name)];
    if (other.from === i.from) {
      indexToRemove.add(idx);
      return;
    }
    const diff = (other.priority || 1) - (i.priority || 1);
    if (diff === 0) {
      warn(`Duplicated imports "${name}", the one from "${other.from}" has been ignored`);
    }
    if (diff <= 0) {
      indexToRemove.add(map.get(name));
      map.set(name, idx);
    } else {
      indexToRemove.add(idx);
    }
  });
  return imports.filter((_, idx) => !indexToRemove.has(idx));
}
function toExports(imports, fileDir) {
  const map = toImportModuleMap(imports);
  return Object.entries(map).flatMap(([name, imports2]) => {
    name = name.replace(/\.[a-z]+$/, "");
    if (fileDir && isAbsolute(name)) {
      name = relative(fileDir, name);
      if (!name.match(/^[.\/]/)) {
        name = "./" + name;
      }
    }
    const entries = [];
    const filtered = Array.from(imports2).filter((i) => {
      if (i.name === "*") {
        entries.push(`export * as ${i.as} from '${name}';`);
        return false;
      }
      return true;
    });
    if (filtered.length) {
      entries.push(`export { ${filtered.map((i) => stringifyImportAlias(i, false)).join(", ")} } from '${name}';`);
    }
    return entries;
  }).join("\n");
}
function toTypeDeclarationItems(imports, options) {
  return imports.map((i) => {
    const from = (options?.resolvePath?.(i) || i.from).replace(/\.ts$/, "");
    return `const ${i.as}: typeof import('${from}')${i.name !== "*" ? `['${i.name}']` : ""}`;
  }).sort();
}
function toTypeDeclarationFile(imports, options) {
  const items = toTypeDeclarationItems(imports, options);
  const {
    exportHelper = true
  } = options || {};
  let declaration = "";
  if (exportHelper) {
    declaration += "export {}\n";
  }
  declaration += "declare global {\n" + items.map((i) => "  " + i).join("\n") + "\n}";
  return declaration;
}
function toTypeReExports(imports, options) {
  const importsMap = /* @__PURE__ */ new Map();
  imports.forEach((i) => {
    const from = options?.resolvePath?.(i) || i.from;
    const list = importsMap.get(from) || [];
    list.push(i);
    importsMap.set(from, list);
  });
  const code = Array.from(importsMap.entries()).flatMap(([from, imports2]) => {
    const names = imports2.map((i) => {
      let name = i.name === "*" ? "default" : i.name;
      if (i.as && i.as !== name) {
        name += ` as ${i.as}`;
      }
      return name;
    });
    return [
      "// @ts-ignore",
      `export type { ${names.join(", ")} } from '${from}'`
    ];
  });
  return "// for type re-export\ndeclare global {\n" + code.map((i) => "  " + i).join("\n") + "\n}";
}
function stringifyImportAlias(item, isCJS = false) {
  return item.as === void 0 || item.name === item.as ? item.name : isCJS ? `${item.name}: ${item.as}` : `${item.name} as ${item.as}`;
}
function toImportModuleMap(imports) {
  const map = {};
  for (const _import of imports) {
    if (_import.type) {
      continue;
    }
    if (!map[_import.from]) {
      map[_import.from] = /* @__PURE__ */ new Set();
    }
    map[_import.from].add(_import);
  }
  return map;
}
function getString(code) {
  if (typeof code === "string") {
    return code;
  }
  return code.toString();
}
function getMagicString(code) {
  if (typeof code === "string") {
    return new MagicString(code);
  }
  return code;
}
function addImportToCode(code, imports, isCJS = false, mergeExisting = false, injectAtLast = false, firstOccurrence = Infinity) {
  let newImports = [];
  const s = getMagicString(code);
  let _staticImports;
  function findStaticImportsLazy() {
    if (!_staticImports) {
      _staticImports = findStaticImports(s.original).map((i) => parseStaticImport(i));
    }
    return _staticImports;
  }
  if (mergeExisting && !isCJS) {
    const existingImports = findStaticImportsLazy();
    const map = /* @__PURE__ */ new Map();
    imports.forEach((i) => {
      const target = existingImports.find((e) => e.specifier === i.from && e.imports.startsWith("{"));
      if (!target) {
        return newImports.push(i);
      }
      if (!map.has(target)) {
        map.set(target, []);
      }
      map.get(target).push(i);
    });
    for (const [target, items] of map.entries()) {
      const strings = items.map((i) => stringifyImportAlias(i) + ", ");
      const importLength = target.code.match(/^\s*import\s*{/)?.[0]?.length;
      if (importLength) {
        s.appendLeft(target.start + importLength, " " + strings.join("").trim());
      }
    }
  } else {
    newImports = imports;
  }
  const newEntries = toImports(newImports, isCJS);
  if (newEntries) {
    const insertionIndex = injectAtLast ? findStaticImportsLazy().reverse().find((i) => i.end <= firstOccurrence)?.end ?? 0 : 0;
    if (insertionIndex === 0) {
      s.prepend(newEntries + "\n");
    } else {
      s.appendRight(insertionIndex, "\n" + newEntries + "\n");
    }
  }
  return {
    s,
    get code() {
      return s.toString();
    }
  };
}
function normalizeImports(imports) {
  for (const _import of imports) {
    _import.as = _import.as ?? _import.name;
  }
  return imports;
}
function resolveIdAbsolute(id, parentId) {
  return resolvePath(id, {
    url: parentId
  });
}

const contextRE = /\b_ctx\.([\w_]+)\b/g;
const UNREF_KEY = "__unimport_unref_";
const vueTemplateAddon = () => ({
  async transform(s) {
    if (!s.original.includes("_ctx.") || s.original.includes(UNREF_KEY)) {
      return s;
    }
    const matches = Array.from(s.original.matchAll(contextRE));
    const imports = await this.getImports();
    const targets = [];
    for (const match of matches) {
      const name = match[1];
      const item = imports.find((i) => i.as === name);
      if (!item) {
        continue;
      }
      const start = match.index;
      const end = start + match[0].length;
      const tempName = `__unimport_${name}`;
      s.overwrite(start, end, `(${JSON.stringify(name)} in _ctx ? _ctx.${name} : ${UNREF_KEY}(${tempName}))`);
      if (!targets.find((i) => i.as === tempName)) {
        targets.push({
          ...item,
          as: tempName
        });
      }
    }
    if (targets.length) {
      targets.push({
        name: "unref",
        from: "vue",
        as: UNREF_KEY
      });
      s.prepend(toImports(targets));
    }
    return s;
  },
  async declaration(dts, options) {
    const imports = await this.getImports();
    const items = imports.map((i) => {
      if (i.type) {
        return "";
      }
      const from = options?.resolvePath?.(i) || i.from;
      return `readonly ${i.as}: UnwrapRef<typeof import('${from}')${i.name !== "*" ? `['${i.name}']` : ""}>`;
    }).filter(Boolean).sort();
    const extendItems = items.map((i) => "    " + i).join("\n");
    return dts + `
// for vue template auto import
import { UnwrapRef } from 'vue'
declare module 'vue' {
  interface ComponentCustomProperties {
${extendItems}
  }
}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
${extendItems}
  }
}
`;
  }
});

export { stripCommentsAndStrings as a, dedupeImports as b, toExports as c, defineUnimportPreset as d, excludeRE as e, toTypeDeclarationItems as f, toTypeDeclarationFile as g, toTypeReExports as h, importAsRE as i, getString as j, getMagicString as k, addImportToCode as l, matchRE as m, normalizeImports as n, resolveIdAbsolute as r, separatorRE as s, toImports as t, vueTemplateAddon as v };
