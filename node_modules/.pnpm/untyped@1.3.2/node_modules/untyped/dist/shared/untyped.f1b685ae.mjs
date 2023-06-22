import { i as isObject, g as getType, a as getValue, s as setValue, j as joinPath, b as nonEmpty, u as unique } from './untyped.43bfdbed.mjs';

async function resolveSchema(obj, defaults) {
  const schema = await _resolveSchema(obj, "", {
    root: obj,
    defaults,
    resolveCache: {}
  });
  return schema;
}
async function _resolveSchema(input, id, ctx) {
  if (id in ctx.resolveCache) {
    return ctx.resolveCache[id];
  }
  const schemaId = "#" + id.replace(/\./g, "/");
  if (!isObject(input)) {
    const schema2 = {
      type: getType(input),
      id: schemaId,
      // Clone arrays to avoid mutation
      default: Array.isArray(input) ? [...input] : input
    };
    normalizeSchema(schema2);
    ctx.resolveCache[id] = schema2;
    if (ctx.defaults && getValue(ctx.defaults, id) === void 0) {
      setValue(ctx.defaults, id, schema2.default);
    }
    return schema2;
  }
  const node = { ...input };
  const schema = ctx.resolveCache[id] = {
    ...node.$schema,
    id: schemaId
  };
  for (const key in node) {
    if (key === "$resolve" || key === "$schema" || key === "$default") {
      continue;
    }
    schema.properties = schema.properties || {};
    if (!schema.properties[key]) {
      const child = schema.properties[key] = await _resolveSchema(
        node[key],
        joinPath(id, key),
        ctx
      );
      if (Array.isArray(child.tags) && child.tags.includes("@required")) {
        schema.required = schema.required || [];
        if (!schema.required.includes(key)) {
          schema.required.push(key);
        }
      }
    }
  }
  if (ctx.defaults) {
    schema.default = getValue(ctx.defaults, id);
  }
  if (schema.default === void 0 && "$default" in node) {
    schema.default = node.$default;
  }
  if (typeof node.$resolve === "function") {
    schema.default = await node.$resolve(schema.default, async (key) => {
      return (await _resolveSchema(getValue(ctx.root, key), key, ctx)).default;
    });
  }
  if (ctx.defaults) {
    setValue(ctx.defaults, id, schema.default);
  }
  if (!schema.type) {
    schema.type = getType(schema.default) || (schema.properties ? "object" : "any");
  }
  normalizeSchema(schema);
  if (ctx.defaults && getValue(ctx.defaults, id) === void 0) {
    setValue(ctx.defaults, id, schema.default);
  }
  return schema;
}
async function applyDefaults(ref, input) {
  await resolveSchema(ref, input);
  return input;
}
function normalizeSchema(schema) {
  if (schema.type === "array" && !("items" in schema)) {
    schema.items = {
      type: nonEmpty(unique(schema.default.map((i) => getType(i))))
    };
    if (schema.items.type) {
      if (schema.items.type.length === 0) {
        schema.items.type = "any";
      } else if (schema.items.type.length === 1) {
        schema.items.type = schema.items.type[0];
      }
    }
  }
  if (schema.default === void 0 && ("properties" in schema || schema.type === "object" || schema.type === "any")) {
    const propsWithDefaults = Object.entries(schema.properties || {}).filter(([, prop]) => "default" in prop).map(([key, value]) => [key, value.default]);
    schema.default = Object.fromEntries(propsWithDefaults);
  }
}

export { applyDefaults as a, resolveSchema as r };
