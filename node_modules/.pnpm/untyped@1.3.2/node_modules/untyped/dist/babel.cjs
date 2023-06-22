'use strict';

const t = require('@babel/types');
const utils = require('./shared/untyped.07613105.cjs');
require('scule');

function _interopNamespaceDefault(e) {
  const n = Object.create(null);
  if (e) {
    for (const k in e) {
      n[k] = e[k];
    }
  }
  n.default = e;
  return n;
}

const t__namespace = /*#__PURE__*/_interopNamespaceDefault(t);

const version = "1.3.2";

const babelPluginUntyped = function(api, options) {
  api.cache.using(() => version);
  return {
    visitor: {
      VariableDeclaration(p) {
        const declaration = p.node.declarations[0];
        if (t__namespace.isIdentifier(declaration.id) && (t__namespace.isFunctionExpression(declaration.init) || t__namespace.isArrowFunctionExpression(declaration.init))) {
          const newDeclaration = t__namespace.functionDeclaration(
            declaration.id,
            declaration.init.params,
            t__namespace.isBlockStatement(declaration.init.body) ? declaration.init.body : t__namespace.blockStatement([t__namespace.returnStatement(declaration.init.body)])
          );
          newDeclaration.returnType = declaration.init.returnType;
          p.replaceWith(newDeclaration);
        }
      },
      ObjectProperty(p) {
        if (p.node.leadingComments) {
          const schema = parseJSDocs(
            p.node.leadingComments.filter((c) => c.type === "CommentBlock").map((c) => c.value)
          );
          const valueNode = p.node.value.type === "TSTypeAssertion" || p.node.value.type === "TSAsExpression" ? p.node.value.expression : p.node.value;
          if (valueNode.type === "ObjectExpression") {
            const schemaProp = valueNode.properties.find(
              (prop) => "key" in prop && prop.key.type === "Identifier" && prop.key.name === "$schema"
            );
            if (schemaProp && "value" in schemaProp) {
              if (schemaProp.value.type === "ObjectExpression") {
                schemaProp.value.properties.push(...astify(schema).properties);
              }
            } else {
              valueNode.properties.unshift(
                ...astify({ $schema: schema }).properties
              );
            }
          } else {
            p.node.value = t__namespace.objectExpression([
              t__namespace.objectProperty(t__namespace.identifier("$default"), valueNode),
              t__namespace.objectProperty(t__namespace.identifier("$schema"), astify(schema))
            ]);
          }
          p.node.leadingComments = [];
        }
      },
      FunctionDeclaration(p) {
        const schema = parseJSDocs(
          (p.parent.leadingComments || []).filter((c) => c.type === "CommentBlock").map((c) => c.value)
        );
        schema.type = "function";
        schema.args = [];
        if (!options.experimentalFunctions && !schema.tags.includes("@untyped")) {
          return;
        }
        if (p.parent.type !== "ExportNamedDeclaration" && p.parent.type !== "ExportDefaultDeclaration") {
          return;
        }
        const _getLines = utils.cachedFn(() => this.file.code.split("\n"));
        const getCode = (loc) => {
          const _lines = _getLines();
          return _lines[loc.start.line - 1].slice(loc.start.column, loc.end.column).trim() || "";
        };
        for (const [index, param] of p.node.params.entries()) {
          if (param.loc?.end.line !== param.loc?.start.line) {
            continue;
          }
          if (!t__namespace.isAssignmentPattern(param) && !t__namespace.isIdentifier(param)) {
            continue;
          }
          const lparam = t__namespace.isAssignmentPattern(param) ? param.left : param;
          if (!t__namespace.isIdentifier(lparam)) {
            continue;
          }
          const arg = {
            name: lparam.name || "arg" + index,
            optional: lparam.optional || void 0
          };
          if (lparam.typeAnnotation) {
            Object.assign(
              arg,
              utils.mergedTypes(
                arg,
                inferAnnotationType(lparam.typeAnnotation, getCode)
              )
            );
          }
          if (param.type === "AssignmentPattern") {
            Object.assign(
              arg,
              utils.mergedTypes(arg, inferArgType(param.right))
            );
          }
          schema.args = schema.args || [];
          schema.args.push(arg);
        }
        if (p.node.returnType?.type === "TSTypeAnnotation") {
          schema.returns = inferAnnotationType(p.node.returnType, getCode);
        }
        schema.tags = schema.tags?.filter((tag) => {
          if (tag.startsWith("@returns")) {
            const { type } = tag.match(/^@returns\s+{(?<type>[\S\s]+)}/)?.groups || {};
            if (type) {
              schema.returns = schema.returns || {};
              Object.assign(schema.returns, utils.getTypeDescriptor(type));
              return false;
            }
          }
          if (tag.startsWith("@param")) {
            const { type, param } = tag.match(/^@param\s+{(?<type>[\S\s]+)}\s+(?<param>\w+)/)?.groups || {};
            if (type && param) {
              const arg = schema.args?.find((arg2) => arg2.name === param);
              if (arg) {
                Object.assign(arg, utils.getTypeDescriptor(type));
                return false;
              }
            }
          }
          return true;
        });
        if (p.parent.type === "ExportDefaultDeclaration") {
          p.replaceWith(astify({ $schema: schema }));
        } else {
          p.replaceWith(
            t__namespace.variableDeclaration("const", [
              t__namespace.variableDeclarator(
                t__namespace.identifier(p.node.id.name),
                astify({ $schema: schema })
              )
            ])
          );
        }
      }
    }
  };
};
function containsIncompleteCodeblock(line = "") {
  const codeDelimiters = line.split("\n").filter((line2) => line2.startsWith("```")).length;
  return !!(codeDelimiters % 2);
}
function clumpLines(lines, delimiters = [" "], separator = " ") {
  const clumps = [];
  while (lines.length > 0) {
    const line = lines.shift();
    if (line && !delimiters.includes(line[0]) && clumps[clumps.length - 1] || containsIncompleteCodeblock(clumps[clumps.length - 1])) {
      clumps[clumps.length - 1] += separator + line;
    } else {
      clumps.push(line);
    }
  }
  return clumps.filter(Boolean);
}
function parseJSDocs(input) {
  const schema = {
    title: "",
    description: "",
    tags: []
  };
  const lines = (Array.isArray(input) ? input : [input]).flatMap(
    (c) => c.split("\n").map((l) => l.replace(/(^\s*\*+ )|([\s*]+$)/g, ""))
  );
  const firstTag = lines.findIndex((l) => l.startsWith("@"));
  const comments = clumpLines(
    lines.slice(0, firstTag >= 0 ? firstTag : void 0)
  );
  if (comments.length === 1) {
    schema.title = comments[0];
  } else if (comments.length > 1) {
    schema.title = comments[0];
    schema.description = comments.splice(1).join("\n");
  }
  if (firstTag >= 0) {
    const tags = clumpLines(lines.slice(firstTag), ["@"], "\n");
    const typedefs = tags.reduce((typedefs2, tag) => {
      const { typedef, alias } = tag.match(/@typedef\s+{(?<typedef>[\S\s]+)} (?<alias>.*)/)?.groups || {};
      if (typedef && alias) {
        typedefs2[typedef] = alias;
      }
      return typedefs2;
    }, {});
    for (const tag of tags) {
      if (tag.startsWith("@type")) {
        const type = tag.match(/@type\s+{([\S\s]+)}/)?.[1];
        if (!type) {
          continue;
        }
        Object.assign(schema, utils.getTypeDescriptor(type));
        for (const typedef in typedefs) {
          schema.markdownType = type;
          schema.tsType = schema.tsType.replace(
            new RegExp(typedefs[typedef], "g"),
            typedef
          );
        }
        continue;
      }
      schema.tags.push(tag.trim());
    }
  }
  return schema;
}
function astify(val) {
  if (typeof val === "string") {
    return t__namespace.stringLiteral(val);
  }
  if (typeof val === "boolean") {
    return t__namespace.booleanLiteral(val);
  }
  if (typeof val === "number") {
    return t__namespace.numericLiteral(val);
  }
  if (val === null) {
    return t__namespace.nullLiteral();
  }
  if (val === void 0) {
    return t__namespace.identifier("undefined");
  }
  if (Array.isArray(val)) {
    return t__namespace.arrayExpression(val.map((item) => astify(item)));
  }
  return t__namespace.objectExpression(
    Object.getOwnPropertyNames(val).filter((key) => val[key] !== void 0 && val[key] !== null).map((key) => t__namespace.objectProperty(t__namespace.identifier(key), astify(val[key])))
  );
}
const AST_JSTYPE_MAP = {
  StringLiteral: "string",
  BooleanLiteral: "boolean",
  BigIntLiteral: "bigint",
  DecimalLiteral: "number",
  NumericLiteral: "number",
  ObjectExpression: "object",
  FunctionExpression: "function",
  ArrowFunctionExpression: "function",
  RegExpLiteral: "RegExp"
};
function inferArgType(e, getCode) {
  if (AST_JSTYPE_MAP[e.type]) {
    return utils.getTypeDescriptor(AST_JSTYPE_MAP[e.type]);
  }
  if (e.type === "AssignmentExpression") {
    return inferArgType(e.right);
  }
  if (e.type === "NewExpression" && e.callee.type === "Identifier") {
    return utils.getTypeDescriptor(e.callee.name);
  }
  if (e.type === "ArrayExpression" || e.type === "TupleExpression") {
    const itemTypes = e.elements.filter((el) => t__namespace.isExpression(el)).flatMap((el) => inferArgType(el).type);
    return {
      type: "array",
      items: {
        type: utils.normalizeTypes(itemTypes)
      }
    };
  }
  return {};
}
function inferAnnotationType(ann, getCode) {
  if (ann.type !== "TSTypeAnnotation") {
    return null;
  }
  return inferTSType(ann.typeAnnotation, getCode);
}
function inferTSType(tsType, getCode) {
  if (tsType.type === "TSParenthesizedType") {
    return inferTSType(tsType.typeAnnotation, getCode);
  }
  if (tsType.type === "TSTypeReference") {
    if ("name" in tsType.typeName && tsType.typeName.name === "Array") {
      return {
        type: "array",
        items: inferTSType(tsType.typeParameters.params[0], getCode)
      };
    }
    return utils.getTypeDescriptor(getCode(tsType.loc));
  }
  if (tsType.type === "TSUnionType") {
    return utils.mergedTypes(...tsType.types.map((t2) => inferTSType(t2, getCode)));
  }
  if (tsType.type === "TSArrayType") {
    return {
      type: "array",
      items: inferTSType(tsType.elementType, getCode)
    };
  }
  return utils.getTypeDescriptor(getCode(tsType.loc));
}

module.exports = babelPluginUntyped;
