'use strict';

const utils = require('./untyped.07613105.cjs');

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
  if (!utils.isObject(input)) {
    const schema2 = {
      type: utils.getType(input),
      id: schemaId,
      // Clone arrays to avoid mutation
      default: Array.isArray(input) ? [...input] : input
    };
    normalizeSchema(schema2);
    ctx.resolveCache[id] = schema2;
    if (ctx.defaults && utils.getValue(ctx.defaults, id) === void 0) {
      utils.setValue(ctx.defaults, id, schema2.default);
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
        utils.joinPath(id, key),
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
    schema.default = utils.getValue(ctx.defaults, id);
  }
  if (schema.default === void 0 && "$default" in node) {
    schema.default = node.$default;
  }
  if (typeof node.$resolve === "function") {
    schema.default = await node.$resolve(schema.default, async (key) => {
      return (await _resolveSchema(utils.getValue(ctx.root, key), key, ctx)).default;
    });
  }
  if (ctx.defaults) {
    utils.setValue(ctx.defaults, id, schema.default);
  }
  if (!schema.type) {
    schema.type = utils.getType(schema.default) || (schema.properties ? "object" : "any");
  }
  normalizeSchema(schema);
  if (ctx.defaults && utils.getValue(ctx.defaults, id) === void 0) {
    utils.setValue(ctx.defaults, id, schema.default);
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
      type: utils.nonEmpty(utils.unique(schema.default.map((i) => utils.getType(i))))
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

exports.applyDefaults = applyDefaults;
exports.resolveSchema = resolveSchema;
