'use strict';

function genString(input, options = {}) {
  const string_ = JSON.stringify(input);
  if (!options.singleQuotes) {
    return JSON.stringify(input);
  }
  return `'${escapeString(string_)}'`;
}
const NEEDS_ESCAPE_RE = /[\n\r'\\\u2028\u2029]/;
const QUOTE_NEWLINE_RE = /([\n\r'\u2028\u2029])/g;
const BACKSLASH_RE = /\\/g;
function escapeString(id) {
  if (!NEEDS_ESCAPE_RE.test(id)) {
    return id;
  }
  return id.replace(BACKSLASH_RE, "\\\\").replace(QUOTE_NEWLINE_RE, "\\$1");
}

function genImport(specifier, imports, options = {}) {
  return _genStatement("import", specifier, imports, options);
}
function genTypeImport(specifier, imports, options = {}) {
  return _genStatement("import type", specifier, imports, options);
}
function genTypeExport(specifier, imports, options = {}) {
  return _genStatement("export type", specifier, imports, options);
}
const genInlineTypeImport = (specifier, name = "default", options = {}) => {
  return `typeof ${genDynamicImport(specifier, { ...options, wrapper: false })}.${name}`;
};
function genExport(specifier, exports, options = {}) {
  return _genStatement("export", specifier, exports, options);
}
function _genStatement(type, specifier, names, options = {}) {
  const specifierString = genString(specifier, options);
  if (!names) {
    return `${type} ${specifierString};`;
  }
  const nameArray = Array.isArray(names);
  const _names = (nameArray ? names : [names]).map((index) => {
    if (typeof index === "string") {
      return { name: index };
    }
    if (index.name === index.as) {
      index = { name: index.name };
    }
    return index;
  });
  const namesString = _names.map((index) => index.as ? `${index.name} as ${index.as}` : index.name).join(", ");
  if (nameArray) {
    return `${type} { ${namesString} } from ${genString(specifier, options)}${_genAssertClause(type, options.assert)};`;
  }
  return `${type} ${namesString} from ${genString(specifier, options)}${_genAssertClause(type, options.assert)};`;
}
function _genAssertClause(type, assert) {
  if (type === "import type" || type === "export type") {
    return "";
  }
  if (!assert || typeof assert !== "object") {
    return "";
  }
  return ` assert { type: ${genString(assert.type)} }`;
}
function genDynamicImport(specifier, options = {}) {
  const commentString = options.comment ? ` /* ${options.comment} */` : "";
  const wrapperString = options.wrapper === false ? "" : "() => ";
  const ineropString = options.interopDefault ? ".then(m => m.default || m)" : "";
  const optionsString = _genDynamicImportOptions(options);
  return `${wrapperString}import(${genString(specifier, options)}${commentString}${optionsString})${ineropString}`;
}
function _genDynamicImportOptions(options = {}) {
  return options.assert && typeof options.assert === "object" ? `, { assert: { type: ${genString(options.assert.type)} } }` : "";
}
function genSafeVariableName(name) {
  if (reservedNames.has(name)) {
    return `_${name}`;
  }
  return name.replace(/^\d/, (r) => `_${r}`).replace(/\W/g, (r) => "_" + r.charCodeAt(0));
}
const reservedNames = /* @__PURE__ */ new Set([
  "Infinity",
  "NaN",
  "arguments",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "eval",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "new",
  "null",
  "package",
  "private",
  "protected",
  "public",
  "return",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "true",
  "try",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "with",
  "yield"
]);

function wrapInDelimiters(lines, indent = "", delimiters = "{}", withComma = true) {
  if (lines.length === 0) {
    return delimiters;
  }
  const [start, end] = delimiters;
  return `${start}
` + lines.join(withComma ? ",\n" : "\n") + `
${indent}${end}`;
}
const VALID_IDENTIFIER_RE = /^[$_]?\w*$/;
function genObjectKey(key) {
  return VALID_IDENTIFIER_RE.test(key) ? key : genString(key);
}

function genObjectFromRaw(object, indent = "") {
  return genObjectFromRawEntries(Object.entries(object), indent);
}
function genArrayFromRaw(array, indent = "") {
  const newIdent = indent + "  ";
  return wrapInDelimiters(array.map((index) => `${newIdent}${genRawValue(index, newIdent)}`), indent, "[]");
}
function genObjectFromRawEntries(array, indent = "") {
  const newIdent = indent + "  ";
  return wrapInDelimiters(array.map(([key, value]) => `${newIdent}${genObjectKey(key)}: ${genRawValue(value, newIdent)}`), indent, "{}");
}
function genRawValue(value, indent = "") {
  if (typeof value === "undefined") {
    return "undefined";
  }
  if (value === null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return genArrayFromRaw(value, indent);
  }
  if (value && typeof value === "object") {
    return genObjectFromRaw(value, indent);
  }
  return value.toString();
}

const genTypeObject = (object, indent = "") => {
  const newIndent = indent + "  ";
  return wrapInDelimiters(Object.entries(object).map(([key, value]) => {
    const [, k = key, optional = ""] = key.match(/^(.*[^?])(\?)?$/) || [];
    if (typeof value === "string") {
      return `${newIndent}${genObjectKey(k)}${optional}: ${value}`;
    }
    return `${newIndent}${genObjectKey(k)}${optional}: ${genTypeObject(value, newIndent)}`;
  }), indent, "{}", false);
};
const genInterface = (name, contents, options = {}) => {
  const result = [
    options.export && "export",
    `interface ${name}`,
    options.extends && `extends ${Array.isArray(options.extends) ? options.extends.join(", ") : options.extends}`,
    contents ? genTypeObject(contents) : "{}"
  ].filter(Boolean).join(" ");
  return result;
};
const genAugmentation = (specifier, interfaces) => {
  return `declare module ${genString(specifier)} ${wrapInDelimiters(
    Object.entries(interfaces || {}).map(
      ([key, entry]) => "  " + (Array.isArray(entry) ? genInterface(key, ...entry) : genInterface(key, entry))
    )
  )}`;
};

exports.escapeString = escapeString;
exports.genArrayFromRaw = genArrayFromRaw;
exports.genAugmentation = genAugmentation;
exports.genDynamicImport = genDynamicImport;
exports.genExport = genExport;
exports.genImport = genImport;
exports.genInlineTypeImport = genInlineTypeImport;
exports.genInterface = genInterface;
exports.genObjectFromRaw = genObjectFromRaw;
exports.genObjectFromRawEntries = genObjectFromRawEntries;
exports.genSafeVariableName = genSafeVariableName;
exports.genString = genString;
exports.genTypeExport = genTypeExport;
exports.genTypeImport = genTypeImport;
exports.genTypeObject = genTypeObject;
