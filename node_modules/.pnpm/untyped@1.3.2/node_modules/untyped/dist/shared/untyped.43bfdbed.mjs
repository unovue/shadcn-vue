import { pascalCase } from 'scule';

function defineUntypedSchema(options) {
  return options;
}
function escapeKey(val) {
  return /^\w+$/.test(val) ? val : `"${val}"`;
}
function getType(val) {
  const type = typeof val;
  if (type === "undefined" || val === null) {
    return void 0;
  }
  if (Array.isArray(val)) {
    return "array";
  }
  return type;
}
function isObject(val) {
  return val !== null && !Array.isArray(val) && typeof val === "object";
}
function nonEmpty(arr) {
  return arr.filter(Boolean);
}
function unique(arr) {
  return [...new Set(arr)];
}
function joinPath(a, b = "", sep = ".") {
  return a ? a + sep + b : b;
}
function setValue(obj, path, val) {
  const keys = path.split(".");
  const _key = keys.pop();
  for (const key of keys) {
    if (!obj || typeof obj !== "object") {
      return;
    }
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  if (_key) {
    if (!obj || typeof obj !== "object") {
      return;
    }
    obj[_key] = val;
  }
}
function getValue(obj, path) {
  for (const key of path.split(".")) {
    if (!obj || typeof obj !== "object" || !(key in obj)) {
      return;
    }
    obj = obj[key];
  }
  return obj;
}
function mergedTypes(...types) {
  types = types.filter(Boolean);
  if (types.length === 0) {
    return {};
  }
  if (types.length === 1) {
    return types[0];
  }
  const tsTypes = normalizeTypes(
    types.flatMap((t) => t.tsType).filter(Boolean)
  );
  return {
    type: normalizeTypes(types.flatMap((t) => t.type).filter(Boolean)),
    tsType: Array.isArray(tsTypes) ? tsTypes.join(" | ") : tsTypes,
    items: mergedTypes(...types.flatMap((t) => t.items).filter(Boolean))
  };
}
function normalizeTypes(val) {
  const arr = unique(val.filter(Boolean));
  if (arr.length === 0 || arr.includes("any")) {
    return;
  }
  return arr.length > 1 ? arr : arr[0];
}
function cachedFn(fn) {
  let val;
  let resolved = false;
  return () => {
    if (!resolved) {
      val = fn();
      resolved = true;
    }
    return val;
  };
}
const jsTypes = /* @__PURE__ */ new Set([
  "string",
  "number",
  "bigint",
  "boolean",
  "symbol",
  "function",
  "object",
  "any",
  "array"
]);
function isJSType(val) {
  return jsTypes.has(val);
}
const FRIENDLY_TYPE_RE = /(typeof )?import\(["'](?<importName>[^"']+)["']\)(\[["']|\.)(?<firstType>[^\s"']+)(["']])?/g;
function getTypeDescriptor(type) {
  if (!type) {
    return {};
  }
  let markdownType = type;
  for (const match of type.matchAll(FRIENDLY_TYPE_RE) || []) {
    const { importName, firstType } = match.groups || {};
    if (importName && firstType) {
      markdownType = markdownType.replace(
        match[0],
        pascalCase(importName) + pascalCase(firstType)
      );
    }
  }
  return {
    ...isJSType(type) ? { type } : {},
    tsType: type,
    ...markdownType !== type ? { markdownType } : {}
  };
}

export { getValue as a, nonEmpty as b, getTypeDescriptor as c, defineUntypedSchema as d, escapeKey as e, cachedFn as f, getType as g, isObject as i, joinPath as j, mergedTypes as m, normalizeTypes as n, setValue as s, unique as u };
