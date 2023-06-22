'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var MagicString = require('magic-string');
var estreeWalker = require('estree-walker');
var compilerCore = require('@vue/compiler-core');
var parser = require('@babel/parser');
var shared = require('@vue/shared');

const CONVERT_SYMBOL = "$";
const ESCAPE_SYMBOL = "$$";
const IMPORT_SOURCE = "vue/macros";
const shorthands = ["ref", "computed", "shallowRef", "toRef", "customRef"];
const transformCheckRE = /[^\w]\$(?:\$|ref|computed|shallowRef)?\s*(\(|\<)/;
function shouldTransform(src) {
  return transformCheckRE.test(src);
}
function transform(src, {
  filename,
  sourceMap,
  parserPlugins,
  importHelpersFrom = "vue"
} = {}) {
  const plugins = parserPlugins || [];
  if (filename) {
    if (/\.tsx?$/.test(filename)) {
      plugins.push("typescript");
    }
    if (filename.endsWith("x")) {
      plugins.push("jsx");
    }
  }
  const ast = parser.parse(src, {
    sourceType: "module",
    plugins
  });
  const s = new MagicString(src);
  const res = transformAST(ast.program, s, 0);
  if (res.importedHelpers.length) {
    s.prepend(
      `import { ${res.importedHelpers.map((h) => `${h} as _${h}`).join(", ")} } from '${importHelpersFrom}'
`
    );
  }
  return {
    ...res,
    code: s.toString(),
    map: sourceMap ? s.generateMap({
      source: filename,
      hires: true,
      includeContent: true
    }) : null
  };
}
function transformAST(ast, s, offset = 0, knownRefs, knownProps) {
  warnExperimental();
  const userImports = /* @__PURE__ */ Object.create(null);
  for (const node of ast.body) {
    if (node.type !== "ImportDeclaration")
      continue;
    walkImportDeclaration(node);
  }
  let convertSymbol;
  let escapeSymbol;
  for (const { local, imported, source, specifier } of Object.values(
    userImports
  )) {
    if (source === IMPORT_SOURCE) {
      if (imported === ESCAPE_SYMBOL) {
        escapeSymbol = local;
      } else if (imported === CONVERT_SYMBOL) {
        convertSymbol = local;
      } else if (imported !== local) {
        error(
          `macro imports for ref-creating methods do not support aliasing.`,
          specifier
        );
      }
    }
  }
  if (!convertSymbol && !userImports[CONVERT_SYMBOL]) {
    convertSymbol = CONVERT_SYMBOL;
  }
  if (!escapeSymbol && !userImports[ESCAPE_SYMBOL]) {
    escapeSymbol = ESCAPE_SYMBOL;
  }
  const importedHelpers = /* @__PURE__ */ new Set();
  const rootScope = {};
  const scopeStack = [rootScope];
  let currentScope = rootScope;
  let escapeScope;
  const excludedIds = /* @__PURE__ */ new WeakSet();
  const parentStack = [];
  const propsLocalToPublicMap = /* @__PURE__ */ Object.create(null);
  if (knownRefs) {
    for (const key of knownRefs) {
      rootScope[key] = {};
    }
  }
  if (knownProps) {
    for (const key in knownProps) {
      const { local, isConst } = knownProps[key];
      rootScope[local] = {
        isProp: true,
        isConst: !!isConst
      };
      propsLocalToPublicMap[local] = key;
    }
  }
  function walkImportDeclaration(node) {
    const source = node.source.value;
    if (source === IMPORT_SOURCE) {
      s.remove(node.start + offset, node.end + offset);
    }
    for (const specifier of node.specifiers) {
      const local = specifier.local.name;
      const imported = specifier.type === "ImportSpecifier" && specifier.imported.type === "Identifier" && specifier.imported.name || "default";
      userImports[local] = {
        source,
        local,
        imported,
        specifier
      };
    }
  }
  function isRefCreationCall(callee) {
    if (!convertSymbol || currentScope[convertSymbol] !== void 0) {
      return false;
    }
    if (callee === convertSymbol) {
      return convertSymbol;
    }
    if (callee[0] === "$" && shorthands.includes(callee.slice(1))) {
      return callee;
    }
    return false;
  }
  function error(msg, node) {
    const e = new Error(msg);
    e.node = node;
    throw e;
  }
  function helper(msg) {
    importedHelpers.add(msg);
    return `_${msg}`;
  }
  function registerBinding(id, binding) {
    excludedIds.add(id);
    if (currentScope) {
      currentScope[id.name] = binding ? binding : false;
    } else {
      error(
        "registerBinding called without active scope, something is wrong.",
        id
      );
    }
  }
  const registerRefBinding = (id, isConst = false) => registerBinding(id, { isConst });
  let tempVarCount = 0;
  function genTempVar() {
    return `__$temp_${++tempVarCount}`;
  }
  function snip(node) {
    return s.original.slice(node.start + offset, node.end + offset);
  }
  function walkScope(node, isRoot = false) {
    for (const stmt of node.body) {
      if (stmt.type === "VariableDeclaration") {
        walkVariableDeclaration(stmt, isRoot);
      } else if (stmt.type === "FunctionDeclaration" || stmt.type === "ClassDeclaration") {
        if (stmt.declare || !stmt.id)
          continue;
        registerBinding(stmt.id);
      } else if ((stmt.type === "ForOfStatement" || stmt.type === "ForInStatement") && stmt.left.type === "VariableDeclaration") {
        walkVariableDeclaration(stmt.left);
      } else if (stmt.type === "ExportNamedDeclaration" && stmt.declaration && stmt.declaration.type === "VariableDeclaration") {
        walkVariableDeclaration(stmt.declaration, isRoot);
      } else if (stmt.type === "LabeledStatement" && stmt.body.type === "VariableDeclaration") {
        walkVariableDeclaration(stmt.body, isRoot);
      }
    }
  }
  function walkVariableDeclaration(stmt, isRoot = false) {
    if (stmt.declare) {
      return;
    }
    for (const decl of stmt.declarations) {
      let refCall;
      const isCall = decl.init && decl.init.type === "CallExpression" && decl.init.callee.type === "Identifier";
      if (isCall && (refCall = isRefCreationCall(decl.init.callee.name))) {
        processRefDeclaration(
          refCall,
          decl.id,
          decl.init,
          stmt.kind === "const"
        );
      } else {
        const isProps = isRoot && isCall && decl.init.callee.name === "defineProps";
        for (const id of compilerCore.extractIdentifiers(decl.id)) {
          if (isProps) {
            excludedIds.add(id);
          } else {
            registerBinding(id);
          }
        }
      }
    }
  }
  function processRefDeclaration(method, id, call, isConst) {
    excludedIds.add(call.callee);
    if (method === convertSymbol) {
      s.remove(call.callee.start + offset, call.callee.end + offset);
      if (id.type === "Identifier") {
        registerRefBinding(id, isConst);
      } else if (id.type === "ObjectPattern") {
        processRefObjectPattern(id, call, isConst);
      } else if (id.type === "ArrayPattern") {
        processRefArrayPattern(id, call, isConst);
      }
    } else {
      if (id.type === "Identifier") {
        registerRefBinding(id, isConst);
        s.overwrite(
          call.start + offset,
          call.start + method.length + offset,
          helper(method.slice(1))
        );
      } else {
        error(`${method}() cannot be used with destructure patterns.`, call);
      }
    }
  }
  function processRefObjectPattern(pattern, call, isConst, tempVar, path = []) {
    if (!tempVar) {
      tempVar = genTempVar();
      s.overwrite(pattern.start + offset, pattern.end + offset, tempVar);
    }
    let nameId;
    for (const p of pattern.properties) {
      let key;
      let defaultValue;
      if (p.type === "ObjectProperty") {
        if (p.key.start === p.value.start) {
          nameId = p.key;
          if (p.value.type === "Identifier") {
            excludedIds.add(p.value);
          } else if (p.value.type === "AssignmentPattern" && p.value.left.type === "Identifier") {
            excludedIds.add(p.value.left);
            defaultValue = p.value.right;
          }
        } else {
          key = p.computed ? p.key : p.key.name;
          if (p.value.type === "Identifier") {
            nameId = p.value;
          } else if (p.value.type === "ObjectPattern") {
            processRefObjectPattern(p.value, call, isConst, tempVar, [
              ...path,
              key
            ]);
          } else if (p.value.type === "ArrayPattern") {
            processRefArrayPattern(p.value, call, isConst, tempVar, [
              ...path,
              key
            ]);
          } else if (p.value.type === "AssignmentPattern") {
            if (p.value.left.type === "Identifier") {
              nameId = p.value.left;
              defaultValue = p.value.right;
            } else if (p.value.left.type === "ObjectPattern") {
              processRefObjectPattern(p.value.left, call, isConst, tempVar, [
                ...path,
                [key, p.value.right]
              ]);
            } else if (p.value.left.type === "ArrayPattern") {
              processRefArrayPattern(p.value.left, call, isConst, tempVar, [
                ...path,
                [key, p.value.right]
              ]);
            } else ;
          }
        }
      } else {
        error(`reactivity destructure does not support rest elements.`, p);
      }
      if (nameId) {
        registerRefBinding(nameId, isConst);
        const source = pathToString(tempVar, path);
        const keyStr = shared.isString(key) ? `'${key}'` : key ? snip(key) : `'${nameId.name}'`;
        const defaultStr = defaultValue ? `, ${snip(defaultValue)}` : ``;
        s.appendLeft(
          call.end + offset,
          `,
  ${nameId.name} = ${helper(
            "toRef"
          )}(${source}, ${keyStr}${defaultStr})`
        );
      }
    }
    if (nameId) {
      s.appendLeft(call.end + offset, ";");
    }
  }
  function processRefArrayPattern(pattern, call, isConst, tempVar, path = []) {
    if (!tempVar) {
      tempVar = genTempVar();
      s.overwrite(pattern.start + offset, pattern.end + offset, tempVar);
    }
    let nameId;
    for (let i = 0; i < pattern.elements.length; i++) {
      const e = pattern.elements[i];
      if (!e)
        continue;
      let defaultValue;
      if (e.type === "Identifier") {
        nameId = e;
      } else if (e.type === "AssignmentPattern") {
        nameId = e.left;
        defaultValue = e.right;
      } else if (e.type === "RestElement") {
        error(`reactivity destructure does not support rest elements.`, e);
      } else if (e.type === "ObjectPattern") {
        processRefObjectPattern(e, call, isConst, tempVar, [...path, i]);
      } else if (e.type === "ArrayPattern") {
        processRefArrayPattern(e, call, isConst, tempVar, [...path, i]);
      }
      if (nameId) {
        registerRefBinding(nameId, isConst);
        const source = pathToString(tempVar, path);
        const defaultStr = defaultValue ? `, ${snip(defaultValue)}` : ``;
        s.appendLeft(
          call.end + offset,
          `,
  ${nameId.name} = ${helper(
            "toRef"
          )}(${source}, ${i}${defaultStr})`
        );
      }
    }
    if (nameId) {
      s.appendLeft(call.end + offset, ";");
    }
  }
  function pathToString(source, path) {
    if (path.length) {
      for (const seg of path) {
        if (shared.isArray(seg)) {
          source = `(${source}${segToString(seg[0])} || ${snip(seg[1])})`;
        } else {
          source += segToString(seg);
        }
      }
    }
    return source;
  }
  function segToString(seg) {
    if (typeof seg === "number") {
      return `[${seg}]`;
    } else if (typeof seg === "string") {
      return `.${seg}`;
    } else {
      return snip(seg);
    }
  }
  function rewriteId(scope, id, parent, parentStack2) {
    if (shared.hasOwn(scope, id.name)) {
      const binding = scope[id.name];
      if (binding) {
        if (binding.isConst && (parent.type === "AssignmentExpression" && id === parent.left || parent.type === "UpdateExpression")) {
          error(`Assignment to constant variable.`, id);
        }
        const { isProp } = binding;
        if (compilerCore.isStaticProperty(parent) && parent.shorthand) {
          if (!parent.inPattern || compilerCore.isInDestructureAssignment(parent, parentStack2)) {
            if (isProp) {
              if (escapeScope) {
                registerEscapedPropBinding(id);
                s.appendLeft(
                  id.end + offset,
                  `: __props_${propsLocalToPublicMap[id.name]}`
                );
              } else {
                s.appendLeft(
                  id.end + offset,
                  `: ${shared.genPropsAccessExp(propsLocalToPublicMap[id.name])}`
                );
              }
            } else {
              s.appendLeft(id.end + offset, `: ${id.name}.value`);
            }
          }
        } else {
          if (isProp) {
            if (escapeScope) {
              registerEscapedPropBinding(id);
              s.overwrite(
                id.start + offset,
                id.end + offset,
                `__props_${propsLocalToPublicMap[id.name]}`
              );
            } else {
              s.overwrite(
                id.start + offset,
                id.end + offset,
                shared.genPropsAccessExp(propsLocalToPublicMap[id.name])
              );
            }
          } else {
            s.appendLeft(id.end + offset, ".value");
          }
        }
      }
      return true;
    }
    return false;
  }
  const propBindingRefs = {};
  function registerEscapedPropBinding(id) {
    if (!propBindingRefs.hasOwnProperty(id.name)) {
      propBindingRefs[id.name] = true;
      const publicKey = propsLocalToPublicMap[id.name];
      s.prependRight(
        offset,
        `const __props_${publicKey} = ${helper(
          `toRef`
        )}(__props, '${publicKey}');
`
      );
    }
  }
  walkScope(ast, true);
  estreeWalker.walk(ast, {
    enter(node, parent) {
      parent && parentStack.push(parent);
      if (compilerCore.isFunctionType(node)) {
        scopeStack.push(currentScope = {});
        compilerCore.walkFunctionParams(node, registerBinding);
        if (node.body.type === "BlockStatement") {
          walkScope(node.body);
        }
        return;
      }
      if (node.type === "CatchClause") {
        scopeStack.push(currentScope = {});
        if (node.param && node.param.type === "Identifier") {
          registerBinding(node.param);
        }
        walkScope(node.body);
        return;
      }
      if (node.type === "BlockStatement" && !compilerCore.isFunctionType(parent)) {
        scopeStack.push(currentScope = {});
        walkScope(node);
        return;
      }
      if (parent && parent.type.startsWith("TS") && parent.type !== "TSAsExpression" && parent.type !== "TSNonNullExpression" && parent.type !== "TSTypeAssertion") {
        return this.skip();
      }
      if (node.type === "Identifier") {
        const binding = rootScope[node.name];
        if (
          // if inside $$(), skip unless this is a destructured prop binding
          !(escapeScope && (!binding || !binding.isProp)) && compilerCore.isReferencedIdentifier(node, parent, parentStack) && !excludedIds.has(node)
        ) {
          let i = scopeStack.length;
          while (i--) {
            if (rewriteId(scopeStack[i], node, parent, parentStack)) {
              return;
            }
          }
        }
      }
      if (node.type === "CallExpression" && node.callee.type === "Identifier") {
        const callee = node.callee.name;
        const refCall = isRefCreationCall(callee);
        if (refCall && (!parent || parent.type !== "VariableDeclarator")) {
          return error(
            `${refCall} can only be used as the initializer of a variable declaration.`,
            node
          );
        }
        if (escapeSymbol && currentScope[escapeSymbol] === void 0 && callee === escapeSymbol) {
          escapeScope = node;
          s.remove(node.callee.start + offset, node.callee.end + offset);
          if ((parent == null ? void 0 : parent.type) === "ExpressionStatement") {
            let i = (node.leadingComments ? node.leadingComments[0].start : node.start) + offset;
            while (i--) {
              const char = s.original.charAt(i);
              if (char === "\n") {
                s.prependRight(node.start + offset, ";");
                break;
              } else if (!/\s/.test(char)) {
                break;
              }
            }
          }
        }
      }
    },
    leave(node, parent) {
      parent && parentStack.pop();
      if (node.type === "BlockStatement" && !compilerCore.isFunctionType(parent) || compilerCore.isFunctionType(node)) {
        scopeStack.pop();
        currentScope = scopeStack[scopeStack.length - 1] || null;
      }
      if (node === escapeScope) {
        escapeScope = void 0;
      }
    }
  });
  return {
    rootRefs: Object.keys(rootScope).filter((key) => {
      const binding = rootScope[key];
      return binding && !binding.isProp;
    }),
    importedHelpers: [...importedHelpers]
  };
}
const hasWarned = {};
function warnExperimental() {
  if (typeof window !== "undefined") {
    return;
  }
  warnOnce(
    `Reactivity Transform was an experimental feature and has now been deprecated. It will be removed from Vue core in 3.4. If you intend to continue using it, switch to https://vue-macros.sxzz.moe/features/reactivity-transform.html.
See reason for deprecation here: https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028`
  );
}
function warnOnce(msg) {
  const isNodeProd = typeof process !== "undefined" && process.env.NODE_ENV === "production";
  if (!isNodeProd && true && !hasWarned[msg]) {
    hasWarned[msg] = true;
    warn(msg);
  }
}
function warn(msg) {
  console.warn(
    `\x1B[1m\x1B[33m[@vue/reactivity-transform]\x1B[0m\x1B[33m ${msg}\x1B[0m
`
  );
}

exports.shouldTransform = shouldTransform;
exports.transform = transform;
exports.transformAST = transformAST;
