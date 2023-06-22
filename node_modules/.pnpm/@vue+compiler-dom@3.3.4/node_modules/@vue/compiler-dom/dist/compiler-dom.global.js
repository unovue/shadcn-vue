var VueCompilerDOM = (function (exports) {
  'use strict';

  function makeMap(str, expectsLowerCase) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
  }

  const EMPTY_OBJ = Object.freeze({}) ;
  const NOOP = () => {
  };
  const NO = () => false;
  const onRE = /^on[^a-z]/;
  const isOn = (key) => onRE.test(key);
  const extend = Object.assign;
  const isArray = Array.isArray;
  const isString = (val) => typeof val === "string";
  const isSymbol = (val) => typeof val === "symbol";
  const isObject = (val) => val !== null && typeof val === "object";
  const isReservedProp = /* @__PURE__ */ makeMap(
    // the leading comma is intentional so empty string "" is also included
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  );
  const isBuiltInDirective = /* @__PURE__ */ makeMap(
    "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
  );
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  const hyphenateRE = /\B([A-Z])/g;
  const hyphenate = cacheStringFunction(
    (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
  );
  const capitalize = cacheStringFunction(
    (str) => str.charAt(0).toUpperCase() + str.slice(1)
  );
  const toHandlerKey = cacheStringFunction(
    (str) => str ? `on${capitalize(str)}` : ``
  );

  const PatchFlagNames = {
    [1]: `TEXT`,
    [2]: `CLASS`,
    [4]: `STYLE`,
    [8]: `PROPS`,
    [16]: `FULL_PROPS`,
    [32]: `HYDRATE_EVENTS`,
    [64]: `STABLE_FRAGMENT`,
    [128]: `KEYED_FRAGMENT`,
    [256]: `UNKEYED_FRAGMENT`,
    [512]: `NEED_PATCH`,
    [1024]: `DYNAMIC_SLOTS`,
    [2048]: `DEV_ROOT_FRAGMENT`,
    [-1]: `HOISTED`,
    [-2]: `BAIL`
  };

  const slotFlagsText = {
    [1]: "STABLE",
    [2]: "DYNAMIC",
    [3]: "FORWARDED"
  };

  const range = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
    let lines = source.split(/(\r?\n)/);
    const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
    lines = lines.filter((_, idx) => idx % 2 === 0);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
      count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
      if (count >= start) {
        for (let j = i - range; j <= i + range || end > count; j++) {
          if (j < 0 || j >= lines.length)
            continue;
          const line = j + 1;
          res.push(
            `${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`
          );
          const lineLength = lines[j].length;
          const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
          if (j === i) {
            const pad = start - (count - (lineLength + newLineSeqLength));
            const length = Math.max(
              1,
              end > count ? lineLength - pad : end - start
            );
            res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
          } else if (j > i) {
            if (end > count) {
              const length = Math.max(Math.min(end - count, lineLength), 1);
              res.push(`   |  ` + "^".repeat(length));
            }
            count += lineLength + newLineSeqLength;
          }
        }
        break;
      }
    }
    return res.join("\n");
  }

  const listDelimiterRE = /;(?![^(]*\))/g;
  const propertyDelimiterRE = /:([^]+)/;
  const styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }

  const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
  const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
  const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
  const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
  const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
  const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);

  function defaultOnError(error) {
    throw error;
  }
  function defaultOnWarn(msg) {
    console.warn(`[Vue warn] ${msg.message}`);
  }
  function createCompilerError(code, loc, messages, additionalMessage) {
    const msg = (messages || errorMessages)[code] + (additionalMessage || ``) ;
    const error = new SyntaxError(String(msg));
    error.code = code;
    error.loc = loc;
    return error;
  }
  const errorMessages = {
    // parse errors
    [0]: "Illegal comment.",
    [1]: "CDATA section is allowed only in XML context.",
    [2]: "Duplicate attribute.",
    [3]: "End tag cannot have attributes.",
    [4]: "Illegal '/' in tags.",
    [5]: "Unexpected EOF in tag.",
    [6]: "Unexpected EOF in CDATA section.",
    [7]: "Unexpected EOF in comment.",
    [8]: "Unexpected EOF in script.",
    [9]: "Unexpected EOF in tag.",
    [10]: "Incorrectly closed comment.",
    [11]: "Incorrectly opened comment.",
    [12]: "Illegal tag name. Use '&lt;' to print '<'.",
    [13]: "Attribute value was expected.",
    [14]: "End tag name was expected.",
    [15]: "Whitespace was expected.",
    [16]: "Unexpected '<!--' in comment.",
    [17]: `Attribute name cannot contain U+0022 ("), U+0027 ('), and U+003C (<).`,
    [18]: "Unquoted attribute value cannot contain U+0022 (\"), U+0027 ('), U+003C (<), U+003D (=), and U+0060 (`).",
    [19]: "Attribute name cannot start with '='.",
    [21]: "'<?' is allowed only in XML context.",
    [20]: `Unexpected null character.`,
    [22]: "Illegal '/' in tags.",
    // Vue-specific parse errors
    [23]: "Invalid end tag.",
    [24]: "Element is missing end tag.",
    [25]: "Interpolation end sign was not found.",
    [27]: "End bracket for dynamic directive argument was not found. Note that dynamic directive argument cannot contain spaces.",
    [26]: "Legal directive name was expected.",
    // transform errors
    [28]: `v-if/v-else-if is missing expression.`,
    [29]: `v-if/else branches must use unique keys.`,
    [30]: `v-else/v-else-if has no adjacent v-if or v-else-if.`,
    [31]: `v-for is missing expression.`,
    [32]: `v-for has invalid expression.`,
    [33]: `<template v-for> key should be placed on the <template> tag.`,
    [34]: `v-bind is missing expression.`,
    [35]: `v-on is missing expression.`,
    [36]: `Unexpected custom directive on <slot> outlet.`,
    [37]: `Mixed v-slot usage on both the component and nested <template>. When there are multiple named slots, all slots should use <template> syntax to avoid scope ambiguity.`,
    [38]: `Duplicate slot names found. `,
    [39]: `Extraneous children found when component already has explicitly named default slot. These children will be ignored.`,
    [40]: `v-slot can only be used on components or <template> tags.`,
    [41]: `v-model is missing expression.`,
    [42]: `v-model value must be a valid JavaScript member expression.`,
    [43]: `v-model cannot be used on v-for or v-slot scope variables because they are not writable.`,
    [44]: `v-model cannot be used on a prop, because local prop bindings are not writable.
Use a v-bind binding combined with a v-on listener that emits update:x event instead.`,
    [45]: `Error parsing JavaScript expression: `,
    [46]: `<KeepAlive> expects exactly one child component.`,
    // generic errors
    [47]: `"prefixIdentifiers" option is not supported in this build of compiler.`,
    [48]: `ES module mode is not supported in this build of compiler.`,
    [49]: `"cacheHandlers" option is only supported when the "prefixIdentifiers" option is enabled.`,
    [50]: `"scopeId" option is only supported in module mode.`,
    // deprecations
    [51]: `@vnode-* hooks in templates are deprecated. Use the vue: prefix instead. For example, @vnode-mounted should be changed to @vue:mounted. @vnode-* hooks support will be removed in 3.4.`,
    [52]: `v-is="component-name" has been deprecated. Use is="vue:component-name" instead. v-is support will be removed in 3.4.`,
    // just to fulfill types
    [53]: ``
  };

  const FRAGMENT = Symbol(`Fragment` );
  const TELEPORT = Symbol(`Teleport` );
  const SUSPENSE = Symbol(`Suspense` );
  const KEEP_ALIVE = Symbol(`KeepAlive` );
  const BASE_TRANSITION = Symbol(`BaseTransition` );
  const OPEN_BLOCK = Symbol(`openBlock` );
  const CREATE_BLOCK = Symbol(`createBlock` );
  const CREATE_ELEMENT_BLOCK = Symbol(`createElementBlock` );
  const CREATE_VNODE = Symbol(`createVNode` );
  const CREATE_ELEMENT_VNODE = Symbol(`createElementVNode` );
  const CREATE_COMMENT = Symbol(`createCommentVNode` );
  const CREATE_TEXT = Symbol(`createTextVNode` );
  const CREATE_STATIC = Symbol(`createStaticVNode` );
  const RESOLVE_COMPONENT = Symbol(`resolveComponent` );
  const RESOLVE_DYNAMIC_COMPONENT = Symbol(
    `resolveDynamicComponent` 
  );
  const RESOLVE_DIRECTIVE = Symbol(`resolveDirective` );
  const RESOLVE_FILTER = Symbol(`resolveFilter` );
  const WITH_DIRECTIVES = Symbol(`withDirectives` );
  const RENDER_LIST = Symbol(`renderList` );
  const RENDER_SLOT = Symbol(`renderSlot` );
  const CREATE_SLOTS = Symbol(`createSlots` );
  const TO_DISPLAY_STRING = Symbol(`toDisplayString` );
  const MERGE_PROPS = Symbol(`mergeProps` );
  const NORMALIZE_CLASS = Symbol(`normalizeClass` );
  const NORMALIZE_STYLE = Symbol(`normalizeStyle` );
  const NORMALIZE_PROPS = Symbol(`normalizeProps` );
  const GUARD_REACTIVE_PROPS = Symbol(`guardReactiveProps` );
  const TO_HANDLERS = Symbol(`toHandlers` );
  const CAMELIZE = Symbol(`camelize` );
  const CAPITALIZE = Symbol(`capitalize` );
  const TO_HANDLER_KEY = Symbol(`toHandlerKey` );
  const SET_BLOCK_TRACKING = Symbol(`setBlockTracking` );
  const PUSH_SCOPE_ID = Symbol(`pushScopeId` );
  const POP_SCOPE_ID = Symbol(`popScopeId` );
  const WITH_CTX = Symbol(`withCtx` );
  const UNREF = Symbol(`unref` );
  const IS_REF = Symbol(`isRef` );
  const WITH_MEMO = Symbol(`withMemo` );
  const IS_MEMO_SAME = Symbol(`isMemoSame` );
  const helperNameMap = {
    [FRAGMENT]: `Fragment`,
    [TELEPORT]: `Teleport`,
    [SUSPENSE]: `Suspense`,
    [KEEP_ALIVE]: `KeepAlive`,
    [BASE_TRANSITION]: `BaseTransition`,
    [OPEN_BLOCK]: `openBlock`,
    [CREATE_BLOCK]: `createBlock`,
    [CREATE_ELEMENT_BLOCK]: `createElementBlock`,
    [CREATE_VNODE]: `createVNode`,
    [CREATE_ELEMENT_VNODE]: `createElementVNode`,
    [CREATE_COMMENT]: `createCommentVNode`,
    [CREATE_TEXT]: `createTextVNode`,
    [CREATE_STATIC]: `createStaticVNode`,
    [RESOLVE_COMPONENT]: `resolveComponent`,
    [RESOLVE_DYNAMIC_COMPONENT]: `resolveDynamicComponent`,
    [RESOLVE_DIRECTIVE]: `resolveDirective`,
    [RESOLVE_FILTER]: `resolveFilter`,
    [WITH_DIRECTIVES]: `withDirectives`,
    [RENDER_LIST]: `renderList`,
    [RENDER_SLOT]: `renderSlot`,
    [CREATE_SLOTS]: `createSlots`,
    [TO_DISPLAY_STRING]: `toDisplayString`,
    [MERGE_PROPS]: `mergeProps`,
    [NORMALIZE_CLASS]: `normalizeClass`,
    [NORMALIZE_STYLE]: `normalizeStyle`,
    [NORMALIZE_PROPS]: `normalizeProps`,
    [GUARD_REACTIVE_PROPS]: `guardReactiveProps`,
    [TO_HANDLERS]: `toHandlers`,
    [CAMELIZE]: `camelize`,
    [CAPITALIZE]: `capitalize`,
    [TO_HANDLER_KEY]: `toHandlerKey`,
    [SET_BLOCK_TRACKING]: `setBlockTracking`,
    [PUSH_SCOPE_ID]: `pushScopeId`,
    [POP_SCOPE_ID]: `popScopeId`,
    [WITH_CTX]: `withCtx`,
    [UNREF]: `unref`,
    [IS_REF]: `isRef`,
    [WITH_MEMO]: `withMemo`,
    [IS_MEMO_SAME]: `isMemoSame`
  };
  function registerRuntimeHelpers(helpers) {
    Object.getOwnPropertySymbols(helpers).forEach((s) => {
      helperNameMap[s] = helpers[s];
    });
  }

  const locStub = {
    source: "",
    start: { line: 1, column: 1, offset: 0 },
    end: { line: 1, column: 1, offset: 0 }
  };
  function createRoot(children, loc = locStub) {
    return {
      type: 0,
      children,
      helpers: /* @__PURE__ */ new Set(),
      components: [],
      directives: [],
      hoists: [],
      imports: [],
      cached: 0,
      temps: 0,
      codegenNode: void 0,
      loc
    };
  }
  function createVNodeCall(context, tag, props, children, patchFlag, dynamicProps, directives, isBlock = false, disableTracking = false, isComponent = false, loc = locStub) {
    if (context) {
      if (isBlock) {
        context.helper(OPEN_BLOCK);
        context.helper(getVNodeBlockHelper(context.inSSR, isComponent));
      } else {
        context.helper(getVNodeHelper(context.inSSR, isComponent));
      }
      if (directives) {
        context.helper(WITH_DIRECTIVES);
      }
    }
    return {
      type: 13,
      tag,
      props,
      children,
      patchFlag,
      dynamicProps,
      directives,
      isBlock,
      disableTracking,
      isComponent,
      loc
    };
  }
  function createArrayExpression(elements, loc = locStub) {
    return {
      type: 17,
      loc,
      elements
    };
  }
  function createObjectExpression(properties, loc = locStub) {
    return {
      type: 15,
      loc,
      properties
    };
  }
  function createObjectProperty(key, value) {
    return {
      type: 16,
      loc: locStub,
      key: isString(key) ? createSimpleExpression(key, true) : key,
      value
    };
  }
  function createSimpleExpression(content, isStatic = false, loc = locStub, constType = 0) {
    return {
      type: 4,
      loc,
      content,
      isStatic,
      constType: isStatic ? 3 : constType
    };
  }
  function createInterpolation(content, loc) {
    return {
      type: 5,
      loc,
      content: isString(content) ? createSimpleExpression(content, false, loc) : content
    };
  }
  function createCompoundExpression(children, loc = locStub) {
    return {
      type: 8,
      loc,
      children
    };
  }
  function createCallExpression(callee, args = [], loc = locStub) {
    return {
      type: 14,
      loc,
      callee,
      arguments: args
    };
  }
  function createFunctionExpression(params, returns = void 0, newline = false, isSlot = false, loc = locStub) {
    return {
      type: 18,
      params,
      returns,
      newline,
      isSlot,
      loc
    };
  }
  function createConditionalExpression(test, consequent, alternate, newline = true) {
    return {
      type: 19,
      test,
      consequent,
      alternate,
      newline,
      loc: locStub
    };
  }
  function createCacheExpression(index, value, isVNode = false) {
    return {
      type: 20,
      index,
      value,
      isVNode,
      loc: locStub
    };
  }
  function createBlockStatement(body) {
    return {
      type: 21,
      body,
      loc: locStub
    };
  }
  function createTemplateLiteral(elements) {
    return {
      type: 22,
      elements,
      loc: locStub
    };
  }
  function createIfStatement(test, consequent, alternate) {
    return {
      type: 23,
      test,
      consequent,
      alternate,
      loc: locStub
    };
  }
  function createAssignmentExpression(left, right) {
    return {
      type: 24,
      left,
      right,
      loc: locStub
    };
  }
  function createSequenceExpression(expressions) {
    return {
      type: 25,
      expressions,
      loc: locStub
    };
  }
  function createReturnStatement(returns) {
    return {
      type: 26,
      returns,
      loc: locStub
    };
  }
  function getVNodeHelper(ssr, isComponent) {
    return ssr || isComponent ? CREATE_VNODE : CREATE_ELEMENT_VNODE;
  }
  function getVNodeBlockHelper(ssr, isComponent) {
    return ssr || isComponent ? CREATE_BLOCK : CREATE_ELEMENT_BLOCK;
  }
  function convertToBlock(node, { helper, removeHelper, inSSR }) {
    if (!node.isBlock) {
      node.isBlock = true;
      removeHelper(getVNodeHelper(inSSR, node.isComponent));
      helper(OPEN_BLOCK);
      helper(getVNodeBlockHelper(inSSR, node.isComponent));
    }
  }

  const isStaticExp = (p) => p.type === 4 && p.isStatic;
  const isBuiltInType = (tag, expected) => tag === expected || tag === hyphenate(expected);
  function isCoreComponent(tag) {
    if (isBuiltInType(tag, "Teleport")) {
      return TELEPORT;
    } else if (isBuiltInType(tag, "Suspense")) {
      return SUSPENSE;
    } else if (isBuiltInType(tag, "KeepAlive")) {
      return KEEP_ALIVE;
    } else if (isBuiltInType(tag, "BaseTransition")) {
      return BASE_TRANSITION;
    }
  }
  const nonIdentifierRE = /^\d|[^\$\w]/;
  const isSimpleIdentifier = (name) => !nonIdentifierRE.test(name);
  const validFirstIdentCharRE = /[A-Za-z_$\xA0-\uFFFF]/;
  const validIdentCharRE = /[\.\?\w$\xA0-\uFFFF]/;
  const whitespaceRE = /\s+[.[]\s*|\s*[.[]\s+/g;
  const isMemberExpressionBrowser = (path) => {
    path = path.trim().replace(whitespaceRE, (s) => s.trim());
    let state = 0 /* inMemberExp */;
    let stateStack = [];
    let currentOpenBracketCount = 0;
    let currentOpenParensCount = 0;
    let currentStringType = null;
    for (let i = 0; i < path.length; i++) {
      const char = path.charAt(i);
      switch (state) {
        case 0 /* inMemberExp */:
          if (char === "[") {
            stateStack.push(state);
            state = 1 /* inBrackets */;
            currentOpenBracketCount++;
          } else if (char === "(") {
            stateStack.push(state);
            state = 2 /* inParens */;
            currentOpenParensCount++;
          } else if (!(i === 0 ? validFirstIdentCharRE : validIdentCharRE).test(char)) {
            return false;
          }
          break;
        case 1 /* inBrackets */:
          if (char === `'` || char === `"` || char === "`") {
            stateStack.push(state);
            state = 3 /* inString */;
            currentStringType = char;
          } else if (char === `[`) {
            currentOpenBracketCount++;
          } else if (char === `]`) {
            if (!--currentOpenBracketCount) {
              state = stateStack.pop();
            }
          }
          break;
        case 2 /* inParens */:
          if (char === `'` || char === `"` || char === "`") {
            stateStack.push(state);
            state = 3 /* inString */;
            currentStringType = char;
          } else if (char === `(`) {
            currentOpenParensCount++;
          } else if (char === `)`) {
            if (i === path.length - 1) {
              return false;
            }
            if (!--currentOpenParensCount) {
              state = stateStack.pop();
            }
          }
          break;
        case 3 /* inString */:
          if (char === currentStringType) {
            state = stateStack.pop();
            currentStringType = null;
          }
          break;
      }
    }
    return !currentOpenBracketCount && !currentOpenParensCount;
  };
  const isMemberExpressionNode = NOOP ;
  const isMemberExpression = isMemberExpressionBrowser ;
  function getInnerRange(loc, offset, length) {
    const source = loc.source.slice(offset, offset + length);
    const newLoc = {
      source,
      start: advancePositionWithClone(loc.start, loc.source, offset),
      end: loc.end
    };
    if (length != null) {
      newLoc.end = advancePositionWithClone(
        loc.start,
        loc.source,
        offset + length
      );
    }
    return newLoc;
  }
  function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
    return advancePositionWithMutation(
      extend({}, pos),
      source,
      numberOfCharacters
    );
  }
  function advancePositionWithMutation(pos, source, numberOfCharacters = source.length) {
    let linesCount = 0;
    let lastNewLinePos = -1;
    for (let i = 0; i < numberOfCharacters; i++) {
      if (source.charCodeAt(i) === 10) {
        linesCount++;
        lastNewLinePos = i;
      }
    }
    pos.offset += numberOfCharacters;
    pos.line += linesCount;
    pos.column = lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;
    return pos;
  }
  function assert(condition, msg) {
    if (!condition) {
      throw new Error(msg || `unexpected compiler condition`);
    }
  }
  function findDir(node, name, allowEmpty = false) {
    for (let i = 0; i < node.props.length; i++) {
      const p = node.props[i];
      if (p.type === 7 && (allowEmpty || p.exp) && (isString(name) ? p.name === name : name.test(p.name))) {
        return p;
      }
    }
  }
  function findProp(node, name, dynamicOnly = false, allowEmpty = false) {
    for (let i = 0; i < node.props.length; i++) {
      const p = node.props[i];
      if (p.type === 6) {
        if (dynamicOnly)
          continue;
        if (p.name === name && (p.value || allowEmpty)) {
          return p;
        }
      } else if (p.name === "bind" && (p.exp || allowEmpty) && isStaticArgOf(p.arg, name)) {
        return p;
      }
    }
  }
  function isStaticArgOf(arg, name) {
    return !!(arg && isStaticExp(arg) && arg.content === name);
  }
  function hasDynamicKeyVBind(node) {
    return node.props.some(
      (p) => p.type === 7 && p.name === "bind" && (!p.arg || // v-bind="obj"
      p.arg.type !== 4 || // v-bind:[_ctx.foo]
      !p.arg.isStatic)
      // v-bind:[foo]
    );
  }
  function isText$1(node) {
    return node.type === 5 || node.type === 2;
  }
  function isVSlot(p) {
    return p.type === 7 && p.name === "slot";
  }
  function isTemplateNode(node) {
    return node.type === 1 && node.tagType === 3;
  }
  function isSlotOutlet(node) {
    return node.type === 1 && node.tagType === 2;
  }
  const propsHelperSet = /* @__PURE__ */ new Set([NORMALIZE_PROPS, GUARD_REACTIVE_PROPS]);
  function getUnnormalizedProps(props, callPath = []) {
    if (props && !isString(props) && props.type === 14) {
      const callee = props.callee;
      if (!isString(callee) && propsHelperSet.has(callee)) {
        return getUnnormalizedProps(
          props.arguments[0],
          callPath.concat(props)
        );
      }
    }
    return [props, callPath];
  }
  function injectProp(node, prop, context) {
    let propsWithInjection;
    let props = node.type === 13 ? node.props : node.arguments[2];
    let callPath = [];
    let parentCall;
    if (props && !isString(props) && props.type === 14) {
      const ret = getUnnormalizedProps(props);
      props = ret[0];
      callPath = ret[1];
      parentCall = callPath[callPath.length - 1];
    }
    if (props == null || isString(props)) {
      propsWithInjection = createObjectExpression([prop]);
    } else if (props.type === 14) {
      const first = props.arguments[0];
      if (!isString(first) && first.type === 15) {
        if (!hasProp(prop, first)) {
          first.properties.unshift(prop);
        }
      } else {
        if (props.callee === TO_HANDLERS) {
          propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
            createObjectExpression([prop]),
            props
          ]);
        } else {
          props.arguments.unshift(createObjectExpression([prop]));
        }
      }
      !propsWithInjection && (propsWithInjection = props);
    } else if (props.type === 15) {
      if (!hasProp(prop, props)) {
        props.properties.unshift(prop);
      }
      propsWithInjection = props;
    } else {
      propsWithInjection = createCallExpression(context.helper(MERGE_PROPS), [
        createObjectExpression([prop]),
        props
      ]);
      if (parentCall && parentCall.callee === GUARD_REACTIVE_PROPS) {
        parentCall = callPath[callPath.length - 2];
      }
    }
    if (node.type === 13) {
      if (parentCall) {
        parentCall.arguments[0] = propsWithInjection;
      } else {
        node.props = propsWithInjection;
      }
    } else {
      if (parentCall) {
        parentCall.arguments[0] = propsWithInjection;
      } else {
        node.arguments[2] = propsWithInjection;
      }
    }
  }
  function hasProp(prop, props) {
    let result = false;
    if (prop.key.type === 4) {
      const propKeyName = prop.key.content;
      result = props.properties.some(
        (p) => p.key.type === 4 && p.key.content === propKeyName
      );
    }
    return result;
  }
  function toValidAssetId(name, type) {
    return `_${type}_${name.replace(/[^\w]/g, (searchValue, replaceValue) => {
    return searchValue === "-" ? "_" : name.charCodeAt(replaceValue).toString();
  })}`;
  }
  function hasScopeRef(node, ids) {
    if (!node || Object.keys(ids).length === 0) {
      return false;
    }
    switch (node.type) {
      case 1:
        for (let i = 0; i < node.props.length; i++) {
          const p = node.props[i];
          if (p.type === 7 && (hasScopeRef(p.arg, ids) || hasScopeRef(p.exp, ids))) {
            return true;
          }
        }
        return node.children.some((c) => hasScopeRef(c, ids));
      case 11:
        if (hasScopeRef(node.source, ids)) {
          return true;
        }
        return node.children.some((c) => hasScopeRef(c, ids));
      case 9:
        return node.branches.some((b) => hasScopeRef(b, ids));
      case 10:
        if (hasScopeRef(node.condition, ids)) {
          return true;
        }
        return node.children.some((c) => hasScopeRef(c, ids));
      case 4:
        return !node.isStatic && isSimpleIdentifier(node.content) && !!ids[node.content];
      case 8:
        return node.children.some((c) => isObject(c) && hasScopeRef(c, ids));
      case 5:
      case 12:
        return hasScopeRef(node.content, ids);
      case 2:
      case 3:
        return false;
      default:
        return false;
    }
  }
  function getMemoedVNodeCall(node) {
    if (node.type === 14 && node.callee === WITH_MEMO) {
      return node.arguments[1].returns;
    } else {
      return node;
    }
  }

  const deprecationData = {
    ["COMPILER_IS_ON_ELEMENT"]: {
      message: `Platform-native elements with "is" prop will no longer be treated as components in Vue 3 unless the "is" value is explicitly prefixed with "vue:".`,
      link: `https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html`
    },
    ["COMPILER_V_BIND_SYNC"]: {
      message: (key) => `.sync modifier for v-bind has been removed. Use v-model with argument instead. \`v-bind:${key}.sync\` should be changed to \`v-model:${key}\`.`,
      link: `https://v3-migration.vuejs.org/breaking-changes/v-model.html`
    },
    ["COMPILER_V_BIND_PROP"]: {
      message: `.prop modifier for v-bind has been removed and no longer necessary. Vue 3 will automatically set a binding as DOM property when appropriate.`
    },
    ["COMPILER_V_BIND_OBJECT_ORDER"]: {
      message: `v-bind="obj" usage is now order sensitive and behaves like JavaScript object spread: it will now overwrite an existing non-mergeable attribute that appears before v-bind in the case of conflict. To retain 2.x behavior, move v-bind to make it the first attribute. You can also suppress this warning if the usage is intended.`,
      link: `https://v3-migration.vuejs.org/breaking-changes/v-bind.html`
    },
    ["COMPILER_V_ON_NATIVE"]: {
      message: `.native modifier for v-on has been removed as is no longer necessary.`,
      link: `https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html`
    },
    ["COMPILER_V_IF_V_FOR_PRECEDENCE"]: {
      message: `v-if / v-for precedence when used on the same element has changed in Vue 3: v-if now takes higher precedence and will no longer have access to v-for scope variables. It is best to avoid the ambiguity with <template> tags or use a computed property that filters v-for data source.`,
      link: `https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html`
    },
    ["COMPILER_NATIVE_TEMPLATE"]: {
      message: `<template> with no special directives will render as a native template element instead of its inner content in Vue 3.`
    },
    ["COMPILER_INLINE_TEMPLATE"]: {
      message: `"inline-template" has been removed in Vue 3.`,
      link: `https://v3-migration.vuejs.org/breaking-changes/inline-template-attribute.html`
    },
    ["COMPILER_FILTER"]: {
      message: `filters have been removed in Vue 3. The "|" symbol will be treated as native JavaScript bitwise OR operator. Use method calls or computed properties instead.`,
      link: `https://v3-migration.vuejs.org/breaking-changes/filters.html`
    }
  };
  function getCompatValue(key, context) {
    const config = context.options ? context.options.compatConfig : context.compatConfig;
    const value = config && config[key];
    if (key === "MODE") {
      return value || 3;
    } else {
      return value;
    }
  }
  function isCompatEnabled(key, context) {
    const mode = getCompatValue("MODE", context);
    const value = getCompatValue(key, context);
    return mode === 3 ? value === true : value !== false;
  }
  function checkCompatEnabled(key, context, loc, ...args) {
    const enabled = isCompatEnabled(key, context);
    if (enabled) {
      warnDeprecation(key, context, loc, ...args);
    }
    return enabled;
  }
  function warnDeprecation(key, context, loc, ...args) {
    const val = getCompatValue(key, context);
    if (val === "suppress-warning") {
      return;
    }
    const { message, link } = deprecationData[key];
    const msg = `(deprecation ${key}) ${typeof message === "function" ? message(...args) : message}${link ? `
  Details: ${link}` : ``}`;
    const err = new SyntaxError(msg);
    err.code = key;
    if (loc)
      err.loc = loc;
    context.onWarn(err);
  }

  const decodeRE = /&(gt|lt|amp|apos|quot);/g;
  const decodeMap = {
    gt: ">",
    lt: "<",
    amp: "&",
    apos: "'",
    quot: '"'
  };
  const defaultParserOptions = {
    delimiters: [`{{`, `}}`],
    getNamespace: () => 0,
    getTextMode: () => 0,
    isVoidTag: NO,
    isPreTag: NO,
    isCustomElement: NO,
    decodeEntities: (rawText) => rawText.replace(decodeRE, (_, p1) => decodeMap[p1]),
    onError: defaultOnError,
    onWarn: defaultOnWarn,
    comments: true
  };
  function baseParse(content, options = {}) {
    const context = createParserContext(content, options);
    const start = getCursor(context);
    return createRoot(
      parseChildren(context, 0, []),
      getSelection(context, start)
    );
  }
  function createParserContext(content, rawOptions) {
    const options = extend({}, defaultParserOptions);
    let key;
    for (key in rawOptions) {
      options[key] = rawOptions[key] === void 0 ? defaultParserOptions[key] : rawOptions[key];
    }
    return {
      options,
      column: 1,
      line: 1,
      offset: 0,
      originalSource: content,
      source: content,
      inPre: false,
      inVPre: false,
      onWarn: options.onWarn
    };
  }
  function parseChildren(context, mode, ancestors) {
    const parent = last(ancestors);
    const ns = parent ? parent.ns : 0;
    const nodes = [];
    while (!isEnd(context, mode, ancestors)) {
      const s = context.source;
      let node = void 0;
      if (mode === 0 || mode === 1) {
        if (!context.inVPre && startsWith(s, context.options.delimiters[0])) {
          node = parseInterpolation(context, mode);
        } else if (mode === 0 && s[0] === "<") {
          if (s.length === 1) {
            emitError(context, 5, 1);
          } else if (s[1] === "!") {
            if (startsWith(s, "<!--")) {
              node = parseComment(context);
            } else if (startsWith(s, "<!DOCTYPE")) {
              node = parseBogusComment(context);
            } else if (startsWith(s, "<![CDATA[")) {
              if (ns !== 0) {
                node = parseCDATA(context, ancestors);
              } else {
                emitError(context, 1);
                node = parseBogusComment(context);
              }
            } else {
              emitError(context, 11);
              node = parseBogusComment(context);
            }
          } else if (s[1] === "/") {
            if (s.length === 2) {
              emitError(context, 5, 2);
            } else if (s[2] === ">") {
              emitError(context, 14, 2);
              advanceBy(context, 3);
              continue;
            } else if (/[a-z]/i.test(s[2])) {
              emitError(context, 23);
              parseTag(context, TagType.End, parent);
              continue;
            } else {
              emitError(
                context,
                12,
                2
              );
              node = parseBogusComment(context);
            }
          } else if (/[a-z]/i.test(s[1])) {
            node = parseElement(context, ancestors);
            if (isCompatEnabled(
              "COMPILER_NATIVE_TEMPLATE",
              context
            ) && node && node.tag === "template" && !node.props.some(
              (p) => p.type === 7 && isSpecialTemplateDirective(p.name)
            )) {
              warnDeprecation(
                "COMPILER_NATIVE_TEMPLATE",
                context,
                node.loc
              );
              node = node.children;
            }
          } else if (s[1] === "?") {
            emitError(
              context,
              21,
              1
            );
            node = parseBogusComment(context);
          } else {
            emitError(context, 12, 1);
          }
        }
      }
      if (!node) {
        node = parseText(context, mode);
      }
      if (isArray(node)) {
        for (let i = 0; i < node.length; i++) {
          pushNode(nodes, node[i]);
        }
      } else {
        pushNode(nodes, node);
      }
    }
    let removedWhitespace = false;
    if (mode !== 2 && mode !== 1) {
      const shouldCondense = context.options.whitespace !== "preserve";
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.type === 2) {
          if (!context.inPre) {
            if (!/[^\t\r\n\f ]/.test(node.content)) {
              const prev = nodes[i - 1];
              const next = nodes[i + 1];
              if (!prev || !next || shouldCondense && (prev.type === 3 && next.type === 3 || prev.type === 3 && next.type === 1 || prev.type === 1 && next.type === 3 || prev.type === 1 && next.type === 1 && /[\r\n]/.test(node.content))) {
                removedWhitespace = true;
                nodes[i] = null;
              } else {
                node.content = " ";
              }
            } else if (shouldCondense) {
              node.content = node.content.replace(/[\t\r\n\f ]+/g, " ");
            }
          } else {
            node.content = node.content.replace(/\r\n/g, "\n");
          }
        } else if (node.type === 3 && !context.options.comments) {
          removedWhitespace = true;
          nodes[i] = null;
        }
      }
      if (context.inPre && parent && context.options.isPreTag(parent.tag)) {
        const first = nodes[0];
        if (first && first.type === 2) {
          first.content = first.content.replace(/^\r?\n/, "");
        }
      }
    }
    return removedWhitespace ? nodes.filter(Boolean) : nodes;
  }
  function pushNode(nodes, node) {
    if (node.type === 2) {
      const prev = last(nodes);
      if (prev && prev.type === 2 && prev.loc.end.offset === node.loc.start.offset) {
        prev.content += node.content;
        prev.loc.end = node.loc.end;
        prev.loc.source += node.loc.source;
        return;
      }
    }
    nodes.push(node);
  }
  function parseCDATA(context, ancestors) {
    advanceBy(context, 9);
    const nodes = parseChildren(context, 3, ancestors);
    if (context.source.length === 0) {
      emitError(context, 6);
    } else {
      advanceBy(context, 3);
    }
    return nodes;
  }
  function parseComment(context) {
    const start = getCursor(context);
    let content;
    const match = /--(\!)?>/.exec(context.source);
    if (!match) {
      content = context.source.slice(4);
      advanceBy(context, context.source.length);
      emitError(context, 7);
    } else {
      if (match.index <= 3) {
        emitError(context, 0);
      }
      if (match[1]) {
        emitError(context, 10);
      }
      content = context.source.slice(4, match.index);
      const s = context.source.slice(0, match.index);
      let prevIndex = 1, nestedIndex = 0;
      while ((nestedIndex = s.indexOf("<!--", prevIndex)) !== -1) {
        advanceBy(context, nestedIndex - prevIndex + 1);
        if (nestedIndex + 4 < s.length) {
          emitError(context, 16);
        }
        prevIndex = nestedIndex + 1;
      }
      advanceBy(context, match.index + match[0].length - prevIndex + 1);
    }
    return {
      type: 3,
      content,
      loc: getSelection(context, start)
    };
  }
  function parseBogusComment(context) {
    const start = getCursor(context);
    const contentStart = context.source[1] === "?" ? 1 : 2;
    let content;
    const closeIndex = context.source.indexOf(">");
    if (closeIndex === -1) {
      content = context.source.slice(contentStart);
      advanceBy(context, context.source.length);
    } else {
      content = context.source.slice(contentStart, closeIndex);
      advanceBy(context, closeIndex + 1);
    }
    return {
      type: 3,
      content,
      loc: getSelection(context, start)
    };
  }
  function parseElement(context, ancestors) {
    const wasInPre = context.inPre;
    const wasInVPre = context.inVPre;
    const parent = last(ancestors);
    const element = parseTag(context, TagType.Start, parent);
    const isPreBoundary = context.inPre && !wasInPre;
    const isVPreBoundary = context.inVPre && !wasInVPre;
    if (element.isSelfClosing || context.options.isVoidTag(element.tag)) {
      if (isPreBoundary) {
        context.inPre = false;
      }
      if (isVPreBoundary) {
        context.inVPre = false;
      }
      return element;
    }
    ancestors.push(element);
    const mode = context.options.getTextMode(element, parent);
    const children = parseChildren(context, mode, ancestors);
    ancestors.pop();
    {
      const inlineTemplateProp = element.props.find(
        (p) => p.type === 6 && p.name === "inline-template"
      );
      if (inlineTemplateProp && checkCompatEnabled(
        "COMPILER_INLINE_TEMPLATE",
        context,
        inlineTemplateProp.loc
      )) {
        const loc = getSelection(context, element.loc.end);
        inlineTemplateProp.value = {
          type: 2,
          content: loc.source,
          loc
        };
      }
    }
    element.children = children;
    if (startsWithEndTagOpen(context.source, element.tag)) {
      parseTag(context, TagType.End, parent);
    } else {
      emitError(context, 24, 0, element.loc.start);
      if (context.source.length === 0 && element.tag.toLowerCase() === "script") {
        const first = children[0];
        if (first && startsWith(first.loc.source, "<!--")) {
          emitError(context, 8);
        }
      }
    }
    element.loc = getSelection(context, element.loc.start);
    if (isPreBoundary) {
      context.inPre = false;
    }
    if (isVPreBoundary) {
      context.inVPre = false;
    }
    return element;
  }
  var TagType = /* @__PURE__ */ ((TagType2) => {
    TagType2[TagType2["Start"] = 0] = "Start";
    TagType2[TagType2["End"] = 1] = "End";
    return TagType2;
  })(TagType || {});
  const isSpecialTemplateDirective = /* @__PURE__ */ makeMap(
    `if,else,else-if,for,slot`
  );
  function parseTag(context, type, parent) {
    const start = getCursor(context);
    const match = /^<\/?([a-z][^\t\r\n\f />]*)/i.exec(context.source);
    const tag = match[1];
    const ns = context.options.getNamespace(tag, parent);
    advanceBy(context, match[0].length);
    advanceSpaces(context);
    const cursor = getCursor(context);
    const currentSource = context.source;
    if (context.options.isPreTag(tag)) {
      context.inPre = true;
    }
    let props = parseAttributes(context, type);
    if (type === 0 /* Start */ && !context.inVPre && props.some((p) => p.type === 7 && p.name === "pre")) {
      context.inVPre = true;
      extend(context, cursor);
      context.source = currentSource;
      props = parseAttributes(context, type).filter((p) => p.name !== "v-pre");
    }
    let isSelfClosing = false;
    if (context.source.length === 0) {
      emitError(context, 9);
    } else {
      isSelfClosing = startsWith(context.source, "/>");
      if (type === 1 /* End */ && isSelfClosing) {
        emitError(context, 4);
      }
      advanceBy(context, isSelfClosing ? 2 : 1);
    }
    if (type === 1 /* End */) {
      return;
    }
    if (isCompatEnabled(
      "COMPILER_V_IF_V_FOR_PRECEDENCE",
      context
    )) {
      let hasIf = false;
      let hasFor = false;
      for (let i = 0; i < props.length; i++) {
        const p = props[i];
        if (p.type === 7) {
          if (p.name === "if") {
            hasIf = true;
          } else if (p.name === "for") {
            hasFor = true;
          }
        }
        if (hasIf && hasFor) {
          warnDeprecation(
            "COMPILER_V_IF_V_FOR_PRECEDENCE",
            context,
            getSelection(context, start)
          );
          break;
        }
      }
    }
    let tagType = 0;
    if (!context.inVPre) {
      if (tag === "slot") {
        tagType = 2;
      } else if (tag === "template") {
        if (props.some(
          (p) => p.type === 7 && isSpecialTemplateDirective(p.name)
        )) {
          tagType = 3;
        }
      } else if (isComponent(tag, props, context)) {
        tagType = 1;
      }
    }
    return {
      type: 1,
      ns,
      tag,
      tagType,
      props,
      isSelfClosing,
      children: [],
      loc: getSelection(context, start),
      codegenNode: void 0
      // to be created during transform phase
    };
  }
  function isComponent(tag, props, context) {
    const options = context.options;
    if (options.isCustomElement(tag)) {
      return false;
    }
    if (tag === "component" || /^[A-Z]/.test(tag) || isCoreComponent(tag) || options.isBuiltInComponent && options.isBuiltInComponent(tag) || options.isNativeTag && !options.isNativeTag(tag)) {
      return true;
    }
    for (let i = 0; i < props.length; i++) {
      const p = props[i];
      if (p.type === 6) {
        if (p.name === "is" && p.value) {
          if (p.value.content.startsWith("vue:")) {
            return true;
          } else if (checkCompatEnabled(
            "COMPILER_IS_ON_ELEMENT",
            context,
            p.loc
          )) {
            return true;
          }
        }
      } else {
        if (p.name === "is") {
          return true;
        } else if (
          // :is on plain element - only treat as component in compat mode
          p.name === "bind" && isStaticArgOf(p.arg, "is") && true && checkCompatEnabled(
            "COMPILER_IS_ON_ELEMENT",
            context,
            p.loc
          )
        ) {
          return true;
        }
      }
    }
  }
  function parseAttributes(context, type) {
    const props = [];
    const attributeNames = /* @__PURE__ */ new Set();
    while (context.source.length > 0 && !startsWith(context.source, ">") && !startsWith(context.source, "/>")) {
      if (startsWith(context.source, "/")) {
        emitError(context, 22);
        advanceBy(context, 1);
        advanceSpaces(context);
        continue;
      }
      if (type === 1 /* End */) {
        emitError(context, 3);
      }
      const attr = parseAttribute(context, attributeNames);
      if (attr.type === 6 && attr.value && attr.name === "class") {
        attr.value.content = attr.value.content.replace(/\s+/g, " ").trim();
      }
      if (type === 0 /* Start */) {
        props.push(attr);
      }
      if (/^[^\t\r\n\f />]/.test(context.source)) {
        emitError(context, 15);
      }
      advanceSpaces(context);
    }
    return props;
  }
  function parseAttribute(context, nameSet) {
    var _a;
    const start = getCursor(context);
    const match = /^[^\t\r\n\f />][^\t\r\n\f />=]*/.exec(context.source);
    const name = match[0];
    if (nameSet.has(name)) {
      emitError(context, 2);
    }
    nameSet.add(name);
    if (name[0] === "=") {
      emitError(context, 19);
    }
    {
      const pattern = /["'<]/g;
      let m;
      while (m = pattern.exec(name)) {
        emitError(
          context,
          17,
          m.index
        );
      }
    }
    advanceBy(context, name.length);
    let value = void 0;
    if (/^[\t\r\n\f ]*=/.test(context.source)) {
      advanceSpaces(context);
      advanceBy(context, 1);
      advanceSpaces(context);
      value = parseAttributeValue(context);
      if (!value) {
        emitError(context, 13);
      }
    }
    const loc = getSelection(context, start);
    if (!context.inVPre && /^(v-[A-Za-z0-9-]|:|\.|@|#)/.test(name)) {
      const match2 = /(?:^v-([a-z0-9-]+))?(?:(?::|^\.|^@|^#)(\[[^\]]+\]|[^\.]+))?(.+)?$/i.exec(
        name
      );
      let isPropShorthand = startsWith(name, ".");
      let dirName = match2[1] || (isPropShorthand || startsWith(name, ":") ? "bind" : startsWith(name, "@") ? "on" : "slot");
      let arg;
      if (match2[2]) {
        const isSlot = dirName === "slot";
        const startOffset = name.lastIndexOf(
          match2[2],
          name.length - (((_a = match2[3]) == null ? void 0 : _a.length) || 0)
        );
        const loc2 = getSelection(
          context,
          getNewPosition(context, start, startOffset),
          getNewPosition(
            context,
            start,
            startOffset + match2[2].length + (isSlot && match2[3] || "").length
          )
        );
        let content = match2[2];
        let isStatic = true;
        if (content.startsWith("[")) {
          isStatic = false;
          if (!content.endsWith("]")) {
            emitError(
              context,
              27
            );
            content = content.slice(1);
          } else {
            content = content.slice(1, content.length - 1);
          }
        } else if (isSlot) {
          content += match2[3] || "";
        }
        arg = {
          type: 4,
          content,
          isStatic,
          constType: isStatic ? 3 : 0,
          loc: loc2
        };
      }
      if (value && value.isQuoted) {
        const valueLoc = value.loc;
        valueLoc.start.offset++;
        valueLoc.start.column++;
        valueLoc.end = advancePositionWithClone(valueLoc.start, value.content);
        valueLoc.source = valueLoc.source.slice(1, -1);
      }
      const modifiers = match2[3] ? match2[3].slice(1).split(".") : [];
      if (isPropShorthand)
        modifiers.push("prop");
      if (dirName === "bind" && arg) {
        if (modifiers.includes("sync") && checkCompatEnabled(
          "COMPILER_V_BIND_SYNC",
          context,
          loc,
          arg.loc.source
        )) {
          dirName = "model";
          modifiers.splice(modifiers.indexOf("sync"), 1);
        }
        if (modifiers.includes("prop")) {
          checkCompatEnabled(
            "COMPILER_V_BIND_PROP",
            context,
            loc
          );
        }
      }
      return {
        type: 7,
        name: dirName,
        exp: value && {
          type: 4,
          content: value.content,
          isStatic: false,
          // Treat as non-constant by default. This can be potentially set to
          // other values by `transformExpression` to make it eligible for hoisting.
          constType: 0,
          loc: value.loc
        },
        arg,
        modifiers,
        loc
      };
    }
    if (!context.inVPre && startsWith(name, "v-")) {
      emitError(context, 26);
    }
    return {
      type: 6,
      name,
      value: value && {
        type: 2,
        content: value.content,
        loc: value.loc
      },
      loc
    };
  }
  function parseAttributeValue(context) {
    const start = getCursor(context);
    let content;
    const quote = context.source[0];
    const isQuoted = quote === `"` || quote === `'`;
    if (isQuoted) {
      advanceBy(context, 1);
      const endIndex = context.source.indexOf(quote);
      if (endIndex === -1) {
        content = parseTextData(
          context,
          context.source.length,
          4
        );
      } else {
        content = parseTextData(context, endIndex, 4);
        advanceBy(context, 1);
      }
    } else {
      const match = /^[^\t\r\n\f >]+/.exec(context.source);
      if (!match) {
        return void 0;
      }
      const unexpectedChars = /["'<=`]/g;
      let m;
      while (m = unexpectedChars.exec(match[0])) {
        emitError(
          context,
          18,
          m.index
        );
      }
      content = parseTextData(context, match[0].length, 4);
    }
    return { content, isQuoted, loc: getSelection(context, start) };
  }
  function parseInterpolation(context, mode) {
    const [open, close] = context.options.delimiters;
    const closeIndex = context.source.indexOf(close, open.length);
    if (closeIndex === -1) {
      emitError(context, 25);
      return void 0;
    }
    const start = getCursor(context);
    advanceBy(context, open.length);
    const innerStart = getCursor(context);
    const innerEnd = getCursor(context);
    const rawContentLength = closeIndex - open.length;
    const rawContent = context.source.slice(0, rawContentLength);
    const preTrimContent = parseTextData(context, rawContentLength, mode);
    const content = preTrimContent.trim();
    const startOffset = preTrimContent.indexOf(content);
    if (startOffset > 0) {
      advancePositionWithMutation(innerStart, rawContent, startOffset);
    }
    const endOffset = rawContentLength - (preTrimContent.length - content.length - startOffset);
    advancePositionWithMutation(innerEnd, rawContent, endOffset);
    advanceBy(context, close.length);
    return {
      type: 5,
      content: {
        type: 4,
        isStatic: false,
        // Set `isConstant` to false by default and will decide in transformExpression
        constType: 0,
        content,
        loc: getSelection(context, innerStart, innerEnd)
      },
      loc: getSelection(context, start)
    };
  }
  function parseText(context, mode) {
    const endTokens = mode === 3 ? ["]]>"] : ["<", context.options.delimiters[0]];
    let endIndex = context.source.length;
    for (let i = 0; i < endTokens.length; i++) {
      const index = context.source.indexOf(endTokens[i], 1);
      if (index !== -1 && endIndex > index) {
        endIndex = index;
      }
    }
    const start = getCursor(context);
    const content = parseTextData(context, endIndex, mode);
    return {
      type: 2,
      content,
      loc: getSelection(context, start)
    };
  }
  function parseTextData(context, length, mode) {
    const rawText = context.source.slice(0, length);
    advanceBy(context, length);
    if (mode === 2 || mode === 3 || !rawText.includes("&")) {
      return rawText;
    } else {
      return context.options.decodeEntities(
        rawText,
        mode === 4
      );
    }
  }
  function getCursor(context) {
    const { column, line, offset } = context;
    return { column, line, offset };
  }
  function getSelection(context, start, end) {
    end = end || getCursor(context);
    return {
      start,
      end,
      source: context.originalSource.slice(start.offset, end.offset)
    };
  }
  function last(xs) {
    return xs[xs.length - 1];
  }
  function startsWith(source, searchString) {
    return source.startsWith(searchString);
  }
  function advanceBy(context, numberOfCharacters) {
    const { source } = context;
    advancePositionWithMutation(context, source, numberOfCharacters);
    context.source = source.slice(numberOfCharacters);
  }
  function advanceSpaces(context) {
    const match = /^[\t\r\n\f ]+/.exec(context.source);
    if (match) {
      advanceBy(context, match[0].length);
    }
  }
  function getNewPosition(context, start, numberOfCharacters) {
    return advancePositionWithClone(
      start,
      context.originalSource.slice(start.offset, numberOfCharacters),
      numberOfCharacters
    );
  }
  function emitError(context, code, offset, loc = getCursor(context)) {
    if (offset) {
      loc.offset += offset;
      loc.column += offset;
    }
    context.options.onError(
      createCompilerError(code, {
        start: loc,
        end: loc,
        source: ""
      })
    );
  }
  function isEnd(context, mode, ancestors) {
    const s = context.source;
    switch (mode) {
      case 0:
        if (startsWith(s, "</")) {
          for (let i = ancestors.length - 1; i >= 0; --i) {
            if (startsWithEndTagOpen(s, ancestors[i].tag)) {
              return true;
            }
          }
        }
        break;
      case 1:
      case 2: {
        const parent = last(ancestors);
        if (parent && startsWithEndTagOpen(s, parent.tag)) {
          return true;
        }
        break;
      }
      case 3:
        if (startsWith(s, "]]>")) {
          return true;
        }
        break;
    }
    return !s;
  }
  function startsWithEndTagOpen(source, tag) {
    return startsWith(source, "</") && source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase() && /[\t\r\n\f />]/.test(source[2 + tag.length] || ">");
  }

  function hoistStatic(root, context) {
    walk(
      root,
      context,
      // Root node is unfortunately non-hoistable due to potential parent
      // fallthrough attributes.
      isSingleElementRoot(root, root.children[0])
    );
  }
  function isSingleElementRoot(root, child) {
    const { children } = root;
    return children.length === 1 && child.type === 1 && !isSlotOutlet(child);
  }
  function walk(node, context, doNotHoistNode = false) {
    const { children } = node;
    const originalCount = children.length;
    let hoistedCount = 0;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.type === 1 && child.tagType === 0) {
        const constantType = doNotHoistNode ? 0 : getConstantType(child, context);
        if (constantType > 0) {
          if (constantType >= 2) {
            child.codegenNode.patchFlag = -1 + (` /* HOISTED */` );
            child.codegenNode = context.hoist(child.codegenNode);
            hoistedCount++;
            continue;
          }
        } else {
          const codegenNode = child.codegenNode;
          if (codegenNode.type === 13) {
            const flag = getPatchFlag(codegenNode);
            if ((!flag || flag === 512 || flag === 1) && getGeneratedPropsConstantType(child, context) >= 2) {
              const props = getNodeProps(child);
              if (props) {
                codegenNode.props = context.hoist(props);
              }
            }
            if (codegenNode.dynamicProps) {
              codegenNode.dynamicProps = context.hoist(codegenNode.dynamicProps);
            }
          }
        }
      }
      if (child.type === 1) {
        const isComponent = child.tagType === 1;
        if (isComponent) {
          context.scopes.vSlot++;
        }
        walk(child, context);
        if (isComponent) {
          context.scopes.vSlot--;
        }
      } else if (child.type === 11) {
        walk(child, context, child.children.length === 1);
      } else if (child.type === 9) {
        for (let i2 = 0; i2 < child.branches.length; i2++) {
          walk(
            child.branches[i2],
            context,
            child.branches[i2].children.length === 1
          );
        }
      }
    }
    if (hoistedCount && context.transformHoist) {
      context.transformHoist(children, context, node);
    }
    if (hoistedCount && hoistedCount === originalCount && node.type === 1 && node.tagType === 0 && node.codegenNode && node.codegenNode.type === 13 && isArray(node.codegenNode.children)) {
      node.codegenNode.children = context.hoist(
        createArrayExpression(node.codegenNode.children)
      );
    }
  }
  function getConstantType(node, context) {
    const { constantCache } = context;
    switch (node.type) {
      case 1:
        if (node.tagType !== 0) {
          return 0;
        }
        const cached = constantCache.get(node);
        if (cached !== void 0) {
          return cached;
        }
        const codegenNode = node.codegenNode;
        if (codegenNode.type !== 13) {
          return 0;
        }
        if (codegenNode.isBlock && node.tag !== "svg" && node.tag !== "foreignObject") {
          return 0;
        }
        const flag = getPatchFlag(codegenNode);
        if (!flag) {
          let returnType2 = 3;
          const generatedPropsType = getGeneratedPropsConstantType(node, context);
          if (generatedPropsType === 0) {
            constantCache.set(node, 0);
            return 0;
          }
          if (generatedPropsType < returnType2) {
            returnType2 = generatedPropsType;
          }
          for (let i = 0; i < node.children.length; i++) {
            const childType = getConstantType(node.children[i], context);
            if (childType === 0) {
              constantCache.set(node, 0);
              return 0;
            }
            if (childType < returnType2) {
              returnType2 = childType;
            }
          }
          if (returnType2 > 1) {
            for (let i = 0; i < node.props.length; i++) {
              const p = node.props[i];
              if (p.type === 7 && p.name === "bind" && p.exp) {
                const expType = getConstantType(p.exp, context);
                if (expType === 0) {
                  constantCache.set(node, 0);
                  return 0;
                }
                if (expType < returnType2) {
                  returnType2 = expType;
                }
              }
            }
          }
          if (codegenNode.isBlock) {
            for (let i = 0; i < node.props.length; i++) {
              const p = node.props[i];
              if (p.type === 7) {
                constantCache.set(node, 0);
                return 0;
              }
            }
            context.removeHelper(OPEN_BLOCK);
            context.removeHelper(
              getVNodeBlockHelper(context.inSSR, codegenNode.isComponent)
            );
            codegenNode.isBlock = false;
            context.helper(getVNodeHelper(context.inSSR, codegenNode.isComponent));
          }
          constantCache.set(node, returnType2);
          return returnType2;
        } else {
          constantCache.set(node, 0);
          return 0;
        }
      case 2:
      case 3:
        return 3;
      case 9:
      case 11:
      case 10:
        return 0;
      case 5:
      case 12:
        return getConstantType(node.content, context);
      case 4:
        return node.constType;
      case 8:
        let returnType = 3;
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (isString(child) || isSymbol(child)) {
            continue;
          }
          const childType = getConstantType(child, context);
          if (childType === 0) {
            return 0;
          } else if (childType < returnType) {
            returnType = childType;
          }
        }
        return returnType;
      default:
        return 0;
    }
  }
  const allowHoistedHelperSet = /* @__PURE__ */ new Set([
    NORMALIZE_CLASS,
    NORMALIZE_STYLE,
    NORMALIZE_PROPS,
    GUARD_REACTIVE_PROPS
  ]);
  function getConstantTypeOfHelperCall(value, context) {
    if (value.type === 14 && !isString(value.callee) && allowHoistedHelperSet.has(value.callee)) {
      const arg = value.arguments[0];
      if (arg.type === 4) {
        return getConstantType(arg, context);
      } else if (arg.type === 14) {
        return getConstantTypeOfHelperCall(arg, context);
      }
    }
    return 0;
  }
  function getGeneratedPropsConstantType(node, context) {
    let returnType = 3;
    const props = getNodeProps(node);
    if (props && props.type === 15) {
      const { properties } = props;
      for (let i = 0; i < properties.length; i++) {
        const { key, value } = properties[i];
        const keyType = getConstantType(key, context);
        if (keyType === 0) {
          return keyType;
        }
        if (keyType < returnType) {
          returnType = keyType;
        }
        let valueType;
        if (value.type === 4) {
          valueType = getConstantType(value, context);
        } else if (value.type === 14) {
          valueType = getConstantTypeOfHelperCall(value, context);
        } else {
          valueType = 0;
        }
        if (valueType === 0) {
          return valueType;
        }
        if (valueType < returnType) {
          returnType = valueType;
        }
      }
    }
    return returnType;
  }
  function getNodeProps(node) {
    const codegenNode = node.codegenNode;
    if (codegenNode.type === 13) {
      return codegenNode.props;
    }
  }
  function getPatchFlag(node) {
    const flag = node.patchFlag;
    return flag ? parseInt(flag, 10) : void 0;
  }

  function createTransformContext(root, {
    filename = "",
    prefixIdentifiers = false,
    hoistStatic: hoistStatic2 = false,
    cacheHandlers = false,
    nodeTransforms = [],
    directiveTransforms = {},
    transformHoist = null,
    isBuiltInComponent = NOOP,
    isCustomElement = NOOP,
    expressionPlugins = [],
    scopeId = null,
    slotted = true,
    ssr = false,
    inSSR = false,
    ssrCssVars = ``,
    bindingMetadata = EMPTY_OBJ,
    inline = false,
    isTS = false,
    onError = defaultOnError,
    onWarn = defaultOnWarn,
    compatConfig
  }) {
    const nameMatch = filename.replace(/\?.*$/, "").match(/([^/\\]+)\.\w+$/);
    const context = {
      // options
      selfName: nameMatch && capitalize(camelize(nameMatch[1])),
      prefixIdentifiers,
      hoistStatic: hoistStatic2,
      cacheHandlers,
      nodeTransforms,
      directiveTransforms,
      transformHoist,
      isBuiltInComponent,
      isCustomElement,
      expressionPlugins,
      scopeId,
      slotted,
      ssr,
      inSSR,
      ssrCssVars,
      bindingMetadata,
      inline,
      isTS,
      onError,
      onWarn,
      compatConfig,
      // state
      root,
      helpers: /* @__PURE__ */ new Map(),
      components: /* @__PURE__ */ new Set(),
      directives: /* @__PURE__ */ new Set(),
      hoists: [],
      imports: [],
      constantCache: /* @__PURE__ */ new Map(),
      temps: 0,
      cached: 0,
      identifiers: /* @__PURE__ */ Object.create(null),
      scopes: {
        vFor: 0,
        vSlot: 0,
        vPre: 0,
        vOnce: 0
      },
      parent: null,
      currentNode: root,
      childIndex: 0,
      inVOnce: false,
      // methods
      helper(name) {
        const count = context.helpers.get(name) || 0;
        context.helpers.set(name, count + 1);
        return name;
      },
      removeHelper(name) {
        const count = context.helpers.get(name);
        if (count) {
          const currentCount = count - 1;
          if (!currentCount) {
            context.helpers.delete(name);
          } else {
            context.helpers.set(name, currentCount);
          }
        }
      },
      helperString(name) {
        return `_${helperNameMap[context.helper(name)]}`;
      },
      replaceNode(node) {
        {
          if (!context.currentNode) {
            throw new Error(`Node being replaced is already removed.`);
          }
          if (!context.parent) {
            throw new Error(`Cannot replace root node.`);
          }
        }
        context.parent.children[context.childIndex] = context.currentNode = node;
      },
      removeNode(node) {
        if (!context.parent) {
          throw new Error(`Cannot remove root node.`);
        }
        const list = context.parent.children;
        const removalIndex = node ? list.indexOf(node) : context.currentNode ? context.childIndex : -1;
        if (removalIndex < 0) {
          throw new Error(`node being removed is not a child of current parent`);
        }
        if (!node || node === context.currentNode) {
          context.currentNode = null;
          context.onNodeRemoved();
        } else {
          if (context.childIndex > removalIndex) {
            context.childIndex--;
            context.onNodeRemoved();
          }
        }
        context.parent.children.splice(removalIndex, 1);
      },
      onNodeRemoved: () => {
      },
      addIdentifiers(exp) {
      },
      removeIdentifiers(exp) {
      },
      hoist(exp) {
        if (isString(exp))
          exp = createSimpleExpression(exp);
        context.hoists.push(exp);
        const identifier = createSimpleExpression(
          `_hoisted_${context.hoists.length}`,
          false,
          exp.loc,
          2
        );
        identifier.hoisted = exp;
        return identifier;
      },
      cache(exp, isVNode = false) {
        return createCacheExpression(context.cached++, exp, isVNode);
      }
    };
    {
      context.filters = /* @__PURE__ */ new Set();
    }
    return context;
  }
  function transform(root, options) {
    const context = createTransformContext(root, options);
    traverseNode(root, context);
    if (options.hoistStatic) {
      hoistStatic(root, context);
    }
    if (!options.ssr) {
      createRootCodegen(root, context);
    }
    root.helpers = /* @__PURE__ */ new Set([...context.helpers.keys()]);
    root.components = [...context.components];
    root.directives = [...context.directives];
    root.imports = context.imports;
    root.hoists = context.hoists;
    root.temps = context.temps;
    root.cached = context.cached;
    {
      root.filters = [...context.filters];
    }
  }
  function createRootCodegen(root, context) {
    const { helper } = context;
    const { children } = root;
    if (children.length === 1) {
      const child = children[0];
      if (isSingleElementRoot(root, child) && child.codegenNode) {
        const codegenNode = child.codegenNode;
        if (codegenNode.type === 13) {
          convertToBlock(codegenNode, context);
        }
        root.codegenNode = codegenNode;
      } else {
        root.codegenNode = child;
      }
    } else if (children.length > 1) {
      let patchFlag = 64;
      let patchFlagText = PatchFlagNames[64];
      if (children.filter((c) => c.type !== 3).length === 1) {
        patchFlag |= 2048;
        patchFlagText += `, ${PatchFlagNames[2048]}`;
      }
      root.codegenNode = createVNodeCall(
        context,
        helper(FRAGMENT),
        void 0,
        root.children,
        patchFlag + (` /* ${patchFlagText} */` ),
        void 0,
        void 0,
        true,
        void 0,
        false
        /* isComponent */
      );
    } else ;
  }
  function traverseChildren(parent, context) {
    let i = 0;
    const nodeRemoved = () => {
      i--;
    };
    for (; i < parent.children.length; i++) {
      const child = parent.children[i];
      if (isString(child))
        continue;
      context.parent = parent;
      context.childIndex = i;
      context.onNodeRemoved = nodeRemoved;
      traverseNode(child, context);
    }
  }
  function traverseNode(node, context) {
    context.currentNode = node;
    const { nodeTransforms } = context;
    const exitFns = [];
    for (let i2 = 0; i2 < nodeTransforms.length; i2++) {
      const onExit = nodeTransforms[i2](node, context);
      if (onExit) {
        if (isArray(onExit)) {
          exitFns.push(...onExit);
        } else {
          exitFns.push(onExit);
        }
      }
      if (!context.currentNode) {
        return;
      } else {
        node = context.currentNode;
      }
    }
    switch (node.type) {
      case 3:
        if (!context.ssr) {
          context.helper(CREATE_COMMENT);
        }
        break;
      case 5:
        if (!context.ssr) {
          context.helper(TO_DISPLAY_STRING);
        }
        break;
      case 9:
        for (let i2 = 0; i2 < node.branches.length; i2++) {
          traverseNode(node.branches[i2], context);
        }
        break;
      case 10:
      case 11:
      case 1:
      case 0:
        traverseChildren(node, context);
        break;
    }
    context.currentNode = node;
    let i = exitFns.length;
    while (i--) {
      exitFns[i]();
    }
  }
  function createStructuralDirectiveTransform(name, fn) {
    const matches = isString(name) ? (n) => n === name : (n) => name.test(n);
    return (node, context) => {
      if (node.type === 1) {
        const { props } = node;
        if (node.tagType === 3 && props.some(isVSlot)) {
          return;
        }
        const exitFns = [];
        for (let i = 0; i < props.length; i++) {
          const prop = props[i];
          if (prop.type === 7 && matches(prop.name)) {
            props.splice(i, 1);
            i--;
            const onExit = fn(node, prop, context);
            if (onExit)
              exitFns.push(onExit);
          }
        }
        return exitFns;
      }
    };
  }

  const PURE_ANNOTATION = `/*#__PURE__*/`;
  const aliasHelper = (s) => `${helperNameMap[s]}: _${helperNameMap[s]}`;
  function createCodegenContext(ast, {
    mode = "function",
    prefixIdentifiers = mode === "module",
    sourceMap = false,
    filename = `template.vue.html`,
    scopeId = null,
    optimizeImports = false,
    runtimeGlobalName = `Vue`,
    runtimeModuleName = `vue`,
    ssrRuntimeModuleName = "vue/server-renderer",
    ssr = false,
    isTS = false,
    inSSR = false
  }) {
    const context = {
      mode,
      prefixIdentifiers,
      sourceMap,
      filename,
      scopeId,
      optimizeImports,
      runtimeGlobalName,
      runtimeModuleName,
      ssrRuntimeModuleName,
      ssr,
      isTS,
      inSSR,
      source: ast.loc.source,
      code: ``,
      column: 1,
      line: 1,
      offset: 0,
      indentLevel: 0,
      pure: false,
      map: void 0,
      helper(key) {
        return `_${helperNameMap[key]}`;
      },
      push(code, node) {
        context.code += code;
      },
      indent() {
        newline(++context.indentLevel);
      },
      deindent(withoutNewLine = false) {
        if (withoutNewLine) {
          --context.indentLevel;
        } else {
          newline(--context.indentLevel);
        }
      },
      newline() {
        newline(context.indentLevel);
      }
    };
    function newline(n) {
      context.push("\n" + `  `.repeat(n));
    }
    return context;
  }
  function generate(ast, options = {}) {
    const context = createCodegenContext(ast, options);
    if (options.onContextCreated)
      options.onContextCreated(context);
    const {
      mode,
      push,
      prefixIdentifiers,
      indent,
      deindent,
      newline,
      scopeId,
      ssr
    } = context;
    const helpers = Array.from(ast.helpers);
    const hasHelpers = helpers.length > 0;
    const useWithBlock = !prefixIdentifiers && mode !== "module";
    const isSetupInlined = false;
    const preambleContext = isSetupInlined ? createCodegenContext(ast, options) : context;
    {
      genFunctionPreamble(ast, preambleContext);
    }
    const functionName = ssr ? `ssrRender` : `render`;
    const args = ssr ? ["_ctx", "_push", "_parent", "_attrs"] : ["_ctx", "_cache"];
    const signature = args.join(", ");
    {
      push(`function ${functionName}(${signature}) {`);
    }
    indent();
    if (useWithBlock) {
      push(`with (_ctx) {`);
      indent();
      if (hasHelpers) {
        push(`const { ${helpers.map(aliasHelper).join(", ")} } = _Vue`);
        push(`
`);
        newline();
      }
    }
    if (ast.components.length) {
      genAssets(ast.components, "component", context);
      if (ast.directives.length || ast.temps > 0) {
        newline();
      }
    }
    if (ast.directives.length) {
      genAssets(ast.directives, "directive", context);
      if (ast.temps > 0) {
        newline();
      }
    }
    if (ast.filters && ast.filters.length) {
      newline();
      genAssets(ast.filters, "filter", context);
      newline();
    }
    if (ast.temps > 0) {
      push(`let `);
      for (let i = 0; i < ast.temps; i++) {
        push(`${i > 0 ? `, ` : ``}_temp${i}`);
      }
    }
    if (ast.components.length || ast.directives.length || ast.temps) {
      push(`
`);
      newline();
    }
    if (!ssr) {
      push(`return `);
    }
    if (ast.codegenNode) {
      genNode(ast.codegenNode, context);
    } else {
      push(`null`);
    }
    if (useWithBlock) {
      deindent();
      push(`}`);
    }
    deindent();
    push(`}`);
    return {
      ast,
      code: context.code,
      preamble: isSetupInlined ? preambleContext.code : ``,
      // SourceMapGenerator does have toJSON() method but it's not in the types
      map: context.map ? context.map.toJSON() : void 0
    };
  }
  function genFunctionPreamble(ast, context) {
    const {
      ssr,
      prefixIdentifiers,
      push,
      newline,
      runtimeModuleName,
      runtimeGlobalName,
      ssrRuntimeModuleName
    } = context;
    const VueBinding = runtimeGlobalName;
    const helpers = Array.from(ast.helpers);
    if (helpers.length > 0) {
      {
        push(`const _Vue = ${VueBinding}
`);
        if (ast.hoists.length) {
          const staticHelpers = [
            CREATE_VNODE,
            CREATE_ELEMENT_VNODE,
            CREATE_COMMENT,
            CREATE_TEXT,
            CREATE_STATIC
          ].filter((helper) => helpers.includes(helper)).map(aliasHelper).join(", ");
          push(`const { ${staticHelpers} } = _Vue
`);
        }
      }
    }
    genHoists(ast.hoists, context);
    newline();
    push(`return `);
  }
  function genAssets(assets, type, { helper, push, newline, isTS }) {
    const resolver = helper(
      type === "filter" ? RESOLVE_FILTER : type === "component" ? RESOLVE_COMPONENT : RESOLVE_DIRECTIVE
    );
    for (let i = 0; i < assets.length; i++) {
      let id = assets[i];
      const maybeSelfReference = id.endsWith("__self");
      if (maybeSelfReference) {
        id = id.slice(0, -6);
      }
      push(
        `const ${toValidAssetId(id, type)} = ${resolver}(${JSON.stringify(id)}${maybeSelfReference ? `, true` : ``})${isTS ? `!` : ``}`
      );
      if (i < assets.length - 1) {
        newline();
      }
    }
  }
  function genHoists(hoists, context) {
    if (!hoists.length) {
      return;
    }
    context.pure = true;
    const { push, newline, helper, scopeId, mode } = context;
    newline();
    for (let i = 0; i < hoists.length; i++) {
      const exp = hoists[i];
      if (exp) {
        push(
          `const _hoisted_${i + 1} = ${``}`
        );
        genNode(exp, context);
        newline();
      }
    }
    context.pure = false;
  }
  function isText(n) {
    return isString(n) || n.type === 4 || n.type === 2 || n.type === 5 || n.type === 8;
  }
  function genNodeListAsArray(nodes, context) {
    const multilines = nodes.length > 3 || nodes.some((n) => isArray(n) || !isText(n));
    context.push(`[`);
    multilines && context.indent();
    genNodeList(nodes, context, multilines);
    multilines && context.deindent();
    context.push(`]`);
  }
  function genNodeList(nodes, context, multilines = false, comma = true) {
    const { push, newline } = context;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (isString(node)) {
        push(node);
      } else if (isArray(node)) {
        genNodeListAsArray(node, context);
      } else {
        genNode(node, context);
      }
      if (i < nodes.length - 1) {
        if (multilines) {
          comma && push(",");
          newline();
        } else {
          comma && push(", ");
        }
      }
    }
  }
  function genNode(node, context) {
    if (isString(node)) {
      context.push(node);
      return;
    }
    if (isSymbol(node)) {
      context.push(context.helper(node));
      return;
    }
    switch (node.type) {
      case 1:
      case 9:
      case 11:
        assert(
          node.codegenNode != null,
          `Codegen node is missing for element/if/for node. Apply appropriate transforms first.`
        );
        genNode(node.codegenNode, context);
        break;
      case 2:
        genText(node, context);
        break;
      case 4:
        genExpression(node, context);
        break;
      case 5:
        genInterpolation(node, context);
        break;
      case 12:
        genNode(node.codegenNode, context);
        break;
      case 8:
        genCompoundExpression(node, context);
        break;
      case 3:
        genComment(node, context);
        break;
      case 13:
        genVNodeCall(node, context);
        break;
      case 14:
        genCallExpression(node, context);
        break;
      case 15:
        genObjectExpression(node, context);
        break;
      case 17:
        genArrayExpression(node, context);
        break;
      case 18:
        genFunctionExpression(node, context);
        break;
      case 19:
        genConditionalExpression(node, context);
        break;
      case 20:
        genCacheExpression(node, context);
        break;
      case 21:
        genNodeList(node.body, context, true, false);
        break;
      case 22:
        break;
      case 23:
        break;
      case 24:
        break;
      case 25:
        break;
      case 26:
        break;
      case 10:
        break;
      default:
        {
          assert(false, `unhandled codegen node type: ${node.type}`);
          const exhaustiveCheck = node;
          return exhaustiveCheck;
        }
    }
  }
  function genText(node, context) {
    context.push(JSON.stringify(node.content), node);
  }
  function genExpression(node, context) {
    const { content, isStatic } = node;
    context.push(isStatic ? JSON.stringify(content) : content, node);
  }
  function genInterpolation(node, context) {
    const { push, helper, pure } = context;
    if (pure)
      push(PURE_ANNOTATION);
    push(`${helper(TO_DISPLAY_STRING)}(`);
    genNode(node.content, context);
    push(`)`);
  }
  function genCompoundExpression(node, context) {
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      if (isString(child)) {
        context.push(child);
      } else {
        genNode(child, context);
      }
    }
  }
  function genExpressionAsPropertyKey(node, context) {
    const { push } = context;
    if (node.type === 8) {
      push(`[`);
      genCompoundExpression(node, context);
      push(`]`);
    } else if (node.isStatic) {
      const text = isSimpleIdentifier(node.content) ? node.content : JSON.stringify(node.content);
      push(text, node);
    } else {
      push(`[${node.content}]`, node);
    }
  }
  function genComment(node, context) {
    const { push, helper, pure } = context;
    if (pure) {
      push(PURE_ANNOTATION);
    }
    push(`${helper(CREATE_COMMENT)}(${JSON.stringify(node.content)})`, node);
  }
  function genVNodeCall(node, context) {
    const { push, helper, pure } = context;
    const {
      tag,
      props,
      children,
      patchFlag,
      dynamicProps,
      directives,
      isBlock,
      disableTracking,
      isComponent
    } = node;
    if (directives) {
      push(helper(WITH_DIRECTIVES) + `(`);
    }
    if (isBlock) {
      push(`(${helper(OPEN_BLOCK)}(${disableTracking ? `true` : ``}), `);
    }
    if (pure) {
      push(PURE_ANNOTATION);
    }
    const callHelper = isBlock ? getVNodeBlockHelper(context.inSSR, isComponent) : getVNodeHelper(context.inSSR, isComponent);
    push(helper(callHelper) + `(`, node);
    genNodeList(
      genNullableArgs([tag, props, children, patchFlag, dynamicProps]),
      context
    );
    push(`)`);
    if (isBlock) {
      push(`)`);
    }
    if (directives) {
      push(`, `);
      genNode(directives, context);
      push(`)`);
    }
  }
  function genNullableArgs(args) {
    let i = args.length;
    while (i--) {
      if (args[i] != null)
        break;
    }
    return args.slice(0, i + 1).map((arg) => arg || `null`);
  }
  function genCallExpression(node, context) {
    const { push, helper, pure } = context;
    const callee = isString(node.callee) ? node.callee : helper(node.callee);
    if (pure) {
      push(PURE_ANNOTATION);
    }
    push(callee + `(`, node);
    genNodeList(node.arguments, context);
    push(`)`);
  }
  function genObjectExpression(node, context) {
    const { push, indent, deindent, newline } = context;
    const { properties } = node;
    if (!properties.length) {
      push(`{}`, node);
      return;
    }
    const multilines = properties.length > 1 || properties.some((p) => p.value.type !== 4);
    push(multilines ? `{` : `{ `);
    multilines && indent();
    for (let i = 0; i < properties.length; i++) {
      const { key, value } = properties[i];
      genExpressionAsPropertyKey(key, context);
      push(`: `);
      genNode(value, context);
      if (i < properties.length - 1) {
        push(`,`);
        newline();
      }
    }
    multilines && deindent();
    push(multilines ? `}` : ` }`);
  }
  function genArrayExpression(node, context) {
    genNodeListAsArray(node.elements, context);
  }
  function genFunctionExpression(node, context) {
    const { push, indent, deindent } = context;
    const { params, returns, body, newline, isSlot } = node;
    if (isSlot) {
      push(`_${helperNameMap[WITH_CTX]}(`);
    }
    push(`(`, node);
    if (isArray(params)) {
      genNodeList(params, context);
    } else if (params) {
      genNode(params, context);
    }
    push(`) => `);
    if (newline || body) {
      push(`{`);
      indent();
    }
    if (returns) {
      if (newline) {
        push(`return `);
      }
      if (isArray(returns)) {
        genNodeListAsArray(returns, context);
      } else {
        genNode(returns, context);
      }
    } else if (body) {
      genNode(body, context);
    }
    if (newline || body) {
      deindent();
      push(`}`);
    }
    if (isSlot) {
      if (node.isNonScopedSlot) {
        push(`, undefined, true`);
      }
      push(`)`);
    }
  }
  function genConditionalExpression(node, context) {
    const { test, consequent, alternate, newline: needNewline } = node;
    const { push, indent, deindent, newline } = context;
    if (test.type === 4) {
      const needsParens = !isSimpleIdentifier(test.content);
      needsParens && push(`(`);
      genExpression(test, context);
      needsParens && push(`)`);
    } else {
      push(`(`);
      genNode(test, context);
      push(`)`);
    }
    needNewline && indent();
    context.indentLevel++;
    needNewline || push(` `);
    push(`? `);
    genNode(consequent, context);
    context.indentLevel--;
    needNewline && newline();
    needNewline || push(` `);
    push(`: `);
    const isNested = alternate.type === 19;
    if (!isNested) {
      context.indentLevel++;
    }
    genNode(alternate, context);
    if (!isNested) {
      context.indentLevel--;
    }
    needNewline && deindent(
      true
      /* without newline */
    );
  }
  function genCacheExpression(node, context) {
    const { push, helper, indent, deindent, newline } = context;
    push(`_cache[${node.index}] || (`);
    if (node.isVNode) {
      indent();
      push(`${helper(SET_BLOCK_TRACKING)}(-1),`);
      newline();
    }
    push(`_cache[${node.index}] = `);
    genNode(node.value, context);
    if (node.isVNode) {
      push(`,`);
      newline();
      push(`${helper(SET_BLOCK_TRACKING)}(1),`);
      newline();
      push(`_cache[${node.index}]`);
      deindent();
    }
    push(`)`);
  }

  function walkIdentifiers(root, onIdentifier, includeAll = false, parentStack = [], knownIds = /* @__PURE__ */ Object.create(null)) {
    {
      return;
    }
  }
  function isReferencedIdentifier(id, parent, parentStack) {
    {
      return false;
    }
  }
  function isInDestructureAssignment(parent, parentStack) {
    if (parent && (parent.type === "ObjectProperty" || parent.type === "ArrayPattern")) {
      let i = parentStack.length;
      while (i--) {
        const p = parentStack[i];
        if (p.type === "AssignmentExpression") {
          return true;
        } else if (p.type !== "ObjectProperty" && !p.type.endsWith("Pattern")) {
          break;
        }
      }
    }
    return false;
  }
  function walkFunctionParams(node, onIdent) {
    for (const p of node.params) {
      for (const id of extractIdentifiers(p)) {
        onIdent(id);
      }
    }
  }
  function walkBlockDeclarations(block, onIdent) {
    for (const stmt of block.body) {
      if (stmt.type === "VariableDeclaration") {
        if (stmt.declare)
          continue;
        for (const decl of stmt.declarations) {
          for (const id of extractIdentifiers(decl.id)) {
            onIdent(id);
          }
        }
      } else if (stmt.type === "FunctionDeclaration" || stmt.type === "ClassDeclaration") {
        if (stmt.declare || !stmt.id)
          continue;
        onIdent(stmt.id);
      }
    }
  }
  function extractIdentifiers(param, nodes = []) {
    switch (param.type) {
      case "Identifier":
        nodes.push(param);
        break;
      case "MemberExpression":
        let object = param;
        while (object.type === "MemberExpression") {
          object = object.object;
        }
        nodes.push(object);
        break;
      case "ObjectPattern":
        for (const prop of param.properties) {
          if (prop.type === "RestElement") {
            extractIdentifiers(prop.argument, nodes);
          } else {
            extractIdentifiers(prop.value, nodes);
          }
        }
        break;
      case "ArrayPattern":
        param.elements.forEach((element) => {
          if (element)
            extractIdentifiers(element, nodes);
        });
        break;
      case "RestElement":
        extractIdentifiers(param.argument, nodes);
        break;
      case "AssignmentPattern":
        extractIdentifiers(param.left, nodes);
        break;
    }
    return nodes;
  }
  const isFunctionType = (node) => {
    return /Function(?:Expression|Declaration)$|Method$/.test(node.type);
  };
  const isStaticProperty = (node) => node && (node.type === "ObjectProperty" || node.type === "ObjectMethod") && !node.computed;
  const isStaticPropertyKey = (node, parent) => isStaticProperty(parent) && parent.key === node;
  const TS_NODE_TYPES = [
    "TSAsExpression",
    // foo as number
    "TSTypeAssertion",
    // (<number>foo)
    "TSNonNullExpression",
    // foo!
    "TSInstantiationExpression",
    // foo<string>
    "TSSatisfiesExpression"
    // foo satisfies T
  ];

  const prohibitedKeywordRE = new RegExp(
    "\\b" + "arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b") + "\\b"
  );
  const stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
  function validateBrowserExpression(node, context, asParams = false, asRawStatements = false) {
    const exp = node.content;
    if (!exp.trim()) {
      return;
    }
    try {
      new Function(
        asRawStatements ? ` ${exp} ` : `return ${asParams ? `(${exp}) => {}` : `(${exp})`}`
      );
    } catch (e) {
      let message = e.message;
      const keywordMatch = exp.replace(stripStringRE, "").match(prohibitedKeywordRE);
      if (keywordMatch) {
        message = `avoid using JavaScript keyword as property name: "${keywordMatch[0]}"`;
      }
      context.onError(
        createCompilerError(
          45,
          node.loc,
          void 0,
          message
        )
      );
    }
  }

  const transformExpression = (node, context) => {
    if (node.type === 5) {
      node.content = processExpression(
        node.content,
        context
      );
    } else if (node.type === 1) {
      for (let i = 0; i < node.props.length; i++) {
        const dir = node.props[i];
        if (dir.type === 7 && dir.name !== "for") {
          const exp = dir.exp;
          const arg = dir.arg;
          if (exp && exp.type === 4 && !(dir.name === "on" && arg)) {
            dir.exp = processExpression(
              exp,
              context,
              // slot args must be processed as function params
              dir.name === "slot"
            );
          }
          if (arg && arg.type === 4 && !arg.isStatic) {
            dir.arg = processExpression(arg, context);
          }
        }
      }
    }
  };
  function processExpression(node, context, asParams = false, asRawStatements = false, localVars = Object.create(context.identifiers)) {
    {
      {
        validateBrowserExpression(node, context, asParams, asRawStatements);
      }
      return node;
    }
  }
  function stringifyExpression(exp) {
    if (isString(exp)) {
      return exp;
    } else if (exp.type === 4) {
      return exp.content;
    } else {
      return exp.children.map(stringifyExpression).join("");
    }
  }

  const transformIf = createStructuralDirectiveTransform(
    /^(if|else|else-if)$/,
    (node, dir, context) => {
      return processIf(node, dir, context, (ifNode, branch, isRoot) => {
        const siblings = context.parent.children;
        let i = siblings.indexOf(ifNode);
        let key = 0;
        while (i-- >= 0) {
          const sibling = siblings[i];
          if (sibling && sibling.type === 9) {
            key += sibling.branches.length;
          }
        }
        return () => {
          if (isRoot) {
            ifNode.codegenNode = createCodegenNodeForBranch(
              branch,
              key,
              context
            );
          } else {
            const parentCondition = getParentCondition(ifNode.codegenNode);
            parentCondition.alternate = createCodegenNodeForBranch(
              branch,
              key + ifNode.branches.length - 1,
              context
            );
          }
        };
      });
    }
  );
  function processIf(node, dir, context, processCodegen) {
    if (dir.name !== "else" && (!dir.exp || !dir.exp.content.trim())) {
      const loc = dir.exp ? dir.exp.loc : node.loc;
      context.onError(
        createCompilerError(28, dir.loc)
      );
      dir.exp = createSimpleExpression(`true`, false, loc);
    }
    if (dir.exp) {
      validateBrowserExpression(dir.exp, context);
    }
    if (dir.name === "if") {
      const branch = createIfBranch(node, dir);
      const ifNode = {
        type: 9,
        loc: node.loc,
        branches: [branch]
      };
      context.replaceNode(ifNode);
      if (processCodegen) {
        return processCodegen(ifNode, branch, true);
      }
    } else {
      const siblings = context.parent.children;
      const comments = [];
      let i = siblings.indexOf(node);
      while (i-- >= -1) {
        const sibling = siblings[i];
        if (sibling && sibling.type === 3) {
          context.removeNode(sibling);
          comments.unshift(sibling);
          continue;
        }
        if (sibling && sibling.type === 2 && !sibling.content.trim().length) {
          context.removeNode(sibling);
          continue;
        }
        if (sibling && sibling.type === 9) {
          if (dir.name === "else-if" && sibling.branches[sibling.branches.length - 1].condition === void 0) {
            context.onError(
              createCompilerError(30, node.loc)
            );
          }
          context.removeNode();
          const branch = createIfBranch(node, dir);
          if (comments.length && // #3619 ignore comments if the v-if is direct child of <transition>
          !(context.parent && context.parent.type === 1 && isBuiltInType(context.parent.tag, "transition"))) {
            branch.children = [...comments, ...branch.children];
          }
          {
            const key = branch.userKey;
            if (key) {
              sibling.branches.forEach(({ userKey }) => {
                if (isSameKey(userKey, key)) {
                  context.onError(
                    createCompilerError(
                      29,
                      branch.userKey.loc
                    )
                  );
                }
              });
            }
          }
          sibling.branches.push(branch);
          const onExit = processCodegen && processCodegen(sibling, branch, false);
          traverseNode(branch, context);
          if (onExit)
            onExit();
          context.currentNode = null;
        } else {
          context.onError(
            createCompilerError(30, node.loc)
          );
        }
        break;
      }
    }
  }
  function createIfBranch(node, dir) {
    const isTemplateIf = node.tagType === 3;
    return {
      type: 10,
      loc: node.loc,
      condition: dir.name === "else" ? void 0 : dir.exp,
      children: isTemplateIf && !findDir(node, "for") ? node.children : [node],
      userKey: findProp(node, `key`),
      isTemplateIf
    };
  }
  function createCodegenNodeForBranch(branch, keyIndex, context) {
    if (branch.condition) {
      return createConditionalExpression(
        branch.condition,
        createChildrenCodegenNode(branch, keyIndex, context),
        // make sure to pass in asBlock: true so that the comment node call
        // closes the current block.
        createCallExpression(context.helper(CREATE_COMMENT), [
          '"v-if"' ,
          "true"
        ])
      );
    } else {
      return createChildrenCodegenNode(branch, keyIndex, context);
    }
  }
  function createChildrenCodegenNode(branch, keyIndex, context) {
    const { helper } = context;
    const keyProperty = createObjectProperty(
      `key`,
      createSimpleExpression(
        `${keyIndex}`,
        false,
        locStub,
        2
      )
    );
    const { children } = branch;
    const firstChild = children[0];
    const needFragmentWrapper = children.length !== 1 || firstChild.type !== 1;
    if (needFragmentWrapper) {
      if (children.length === 1 && firstChild.type === 11) {
        const vnodeCall = firstChild.codegenNode;
        injectProp(vnodeCall, keyProperty, context);
        return vnodeCall;
      } else {
        let patchFlag = 64;
        let patchFlagText = PatchFlagNames[64];
        if (!branch.isTemplateIf && children.filter((c) => c.type !== 3).length === 1) {
          patchFlag |= 2048;
          patchFlagText += `, ${PatchFlagNames[2048]}`;
        }
        return createVNodeCall(
          context,
          helper(FRAGMENT),
          createObjectExpression([keyProperty]),
          children,
          patchFlag + (` /* ${patchFlagText} */` ),
          void 0,
          void 0,
          true,
          false,
          false,
          branch.loc
        );
      }
    } else {
      const ret = firstChild.codegenNode;
      const vnodeCall = getMemoedVNodeCall(ret);
      if (vnodeCall.type === 13) {
        convertToBlock(vnodeCall, context);
      }
      injectProp(vnodeCall, keyProperty, context);
      return ret;
    }
  }
  function isSameKey(a, b) {
    if (!a || a.type !== b.type) {
      return false;
    }
    if (a.type === 6) {
      if (a.value.content !== b.value.content) {
        return false;
      }
    } else {
      const exp = a.exp;
      const branchExp = b.exp;
      if (exp.type !== branchExp.type) {
        return false;
      }
      if (exp.type !== 4 || exp.isStatic !== branchExp.isStatic || exp.content !== branchExp.content) {
        return false;
      }
    }
    return true;
  }
  function getParentCondition(node) {
    while (true) {
      if (node.type === 19) {
        if (node.alternate.type === 19) {
          node = node.alternate;
        } else {
          return node;
        }
      } else if (node.type === 20) {
        node = node.value;
      }
    }
  }

  const transformFor = createStructuralDirectiveTransform(
    "for",
    (node, dir, context) => {
      const { helper, removeHelper } = context;
      return processFor(node, dir, context, (forNode) => {
        const renderExp = createCallExpression(helper(RENDER_LIST), [
          forNode.source
        ]);
        const isTemplate = isTemplateNode(node);
        const memo = findDir(node, "memo");
        const keyProp = findProp(node, `key`);
        const keyExp = keyProp && (keyProp.type === 6 ? createSimpleExpression(keyProp.value.content, true) : keyProp.exp);
        const keyProperty = keyProp ? createObjectProperty(`key`, keyExp) : null;
        const isStableFragment = forNode.source.type === 4 && forNode.source.constType > 0;
        const fragmentFlag = isStableFragment ? 64 : keyProp ? 128 : 256;
        forNode.codegenNode = createVNodeCall(
          context,
          helper(FRAGMENT),
          void 0,
          renderExp,
          fragmentFlag + (` /* ${PatchFlagNames[fragmentFlag]} */` ),
          void 0,
          void 0,
          true,
          !isStableFragment,
          false,
          node.loc
        );
        return () => {
          let childBlock;
          const { children } = forNode;
          if (isTemplate) {
            node.children.some((c) => {
              if (c.type === 1) {
                const key = findProp(c, "key");
                if (key) {
                  context.onError(
                    createCompilerError(
                      33,
                      key.loc
                    )
                  );
                  return true;
                }
              }
            });
          }
          const needFragmentWrapper = children.length !== 1 || children[0].type !== 1;
          const slotOutlet = isSlotOutlet(node) ? node : isTemplate && node.children.length === 1 && isSlotOutlet(node.children[0]) ? node.children[0] : null;
          if (slotOutlet) {
            childBlock = slotOutlet.codegenNode;
            if (isTemplate && keyProperty) {
              injectProp(childBlock, keyProperty, context);
            }
          } else if (needFragmentWrapper) {
            childBlock = createVNodeCall(
              context,
              helper(FRAGMENT),
              keyProperty ? createObjectExpression([keyProperty]) : void 0,
              node.children,
              64 + (` /* ${PatchFlagNames[64]} */` ),
              void 0,
              void 0,
              true,
              void 0,
              false
              /* isComponent */
            );
          } else {
            childBlock = children[0].codegenNode;
            if (isTemplate && keyProperty) {
              injectProp(childBlock, keyProperty, context);
            }
            if (childBlock.isBlock !== !isStableFragment) {
              if (childBlock.isBlock) {
                removeHelper(OPEN_BLOCK);
                removeHelper(
                  getVNodeBlockHelper(context.inSSR, childBlock.isComponent)
                );
              } else {
                removeHelper(
                  getVNodeHelper(context.inSSR, childBlock.isComponent)
                );
              }
            }
            childBlock.isBlock = !isStableFragment;
            if (childBlock.isBlock) {
              helper(OPEN_BLOCK);
              helper(getVNodeBlockHelper(context.inSSR, childBlock.isComponent));
            } else {
              helper(getVNodeHelper(context.inSSR, childBlock.isComponent));
            }
          }
          if (memo) {
            const loop = createFunctionExpression(
              createForLoopParams(forNode.parseResult, [
                createSimpleExpression(`_cached`)
              ])
            );
            loop.body = createBlockStatement([
              createCompoundExpression([`const _memo = (`, memo.exp, `)`]),
              createCompoundExpression([
                `if (_cached`,
                ...keyExp ? [` && _cached.key === `, keyExp] : [],
                ` && ${context.helperString(
                IS_MEMO_SAME
              )}(_cached, _memo)) return _cached`
              ]),
              createCompoundExpression([`const _item = `, childBlock]),
              createSimpleExpression(`_item.memo = _memo`),
              createSimpleExpression(`return _item`)
            ]);
            renderExp.arguments.push(
              loop,
              createSimpleExpression(`_cache`),
              createSimpleExpression(String(context.cached++))
            );
          } else {
            renderExp.arguments.push(
              createFunctionExpression(
                createForLoopParams(forNode.parseResult),
                childBlock,
                true
                /* force newline */
              )
            );
          }
        };
      });
    }
  );
  function processFor(node, dir, context, processCodegen) {
    if (!dir.exp) {
      context.onError(
        createCompilerError(31, dir.loc)
      );
      return;
    }
    const parseResult = parseForExpression(
      // can only be simple expression because vFor transform is applied
      // before expression transform.
      dir.exp,
      context
    );
    if (!parseResult) {
      context.onError(
        createCompilerError(32, dir.loc)
      );
      return;
    }
    const { addIdentifiers, removeIdentifiers, scopes } = context;
    const { source, value, key, index } = parseResult;
    const forNode = {
      type: 11,
      loc: dir.loc,
      source,
      valueAlias: value,
      keyAlias: key,
      objectIndexAlias: index,
      parseResult,
      children: isTemplateNode(node) ? node.children : [node]
    };
    context.replaceNode(forNode);
    scopes.vFor++;
    const onExit = processCodegen && processCodegen(forNode);
    return () => {
      scopes.vFor--;
      if (onExit)
        onExit();
    };
  }
  const forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
  const forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
  const stripParensRE = /^\(|\)$/g;
  function parseForExpression(input, context) {
    const loc = input.loc;
    const exp = input.content;
    const inMatch = exp.match(forAliasRE);
    if (!inMatch)
      return;
    const [, LHS, RHS] = inMatch;
    const result = {
      source: createAliasExpression(
        loc,
        RHS.trim(),
        exp.indexOf(RHS, LHS.length)
      ),
      value: void 0,
      key: void 0,
      index: void 0
    };
    {
      validateBrowserExpression(result.source, context);
    }
    let valueContent = LHS.trim().replace(stripParensRE, "").trim();
    const trimmedOffset = LHS.indexOf(valueContent);
    const iteratorMatch = valueContent.match(forIteratorRE);
    if (iteratorMatch) {
      valueContent = valueContent.replace(forIteratorRE, "").trim();
      const keyContent = iteratorMatch[1].trim();
      let keyOffset;
      if (keyContent) {
        keyOffset = exp.indexOf(keyContent, trimmedOffset + valueContent.length);
        result.key = createAliasExpression(loc, keyContent, keyOffset);
        {
          validateBrowserExpression(
            result.key,
            context,
            true
          );
        }
      }
      if (iteratorMatch[2]) {
        const indexContent = iteratorMatch[2].trim();
        if (indexContent) {
          result.index = createAliasExpression(
            loc,
            indexContent,
            exp.indexOf(
              indexContent,
              result.key ? keyOffset + keyContent.length : trimmedOffset + valueContent.length
            )
          );
          {
            validateBrowserExpression(
              result.index,
              context,
              true
            );
          }
        }
      }
    }
    if (valueContent) {
      result.value = createAliasExpression(loc, valueContent, trimmedOffset);
      {
        validateBrowserExpression(
          result.value,
          context,
          true
        );
      }
    }
    return result;
  }
  function createAliasExpression(range, content, offset) {
    return createSimpleExpression(
      content,
      false,
      getInnerRange(range, offset, content.length)
    );
  }
  function createForLoopParams({ value, key, index }, memoArgs = []) {
    return createParamsList([value, key, index, ...memoArgs]);
  }
  function createParamsList(args) {
    let i = args.length;
    while (i--) {
      if (args[i])
        break;
    }
    return args.slice(0, i + 1).map((arg, i2) => arg || createSimpleExpression(`_`.repeat(i2 + 1), false));
  }

  const defaultFallback = createSimpleExpression(`undefined`, false);
  const trackSlotScopes = (node, context) => {
    if (node.type === 1 && (node.tagType === 1 || node.tagType === 3)) {
      const vSlot = findDir(node, "slot");
      if (vSlot) {
        vSlot.exp;
        context.scopes.vSlot++;
        return () => {
          context.scopes.vSlot--;
        };
      }
    }
  };
  const trackVForSlotScopes = (node, context) => {
    let vFor;
    if (isTemplateNode(node) && node.props.some(isVSlot) && (vFor = findDir(node, "for"))) {
      const result = vFor.parseResult = parseForExpression(
        vFor.exp,
        context
      );
      if (result) {
        const { value, key, index } = result;
        const { addIdentifiers, removeIdentifiers } = context;
        value && addIdentifiers(value);
        key && addIdentifiers(key);
        index && addIdentifiers(index);
        return () => {
          value && removeIdentifiers(value);
          key && removeIdentifiers(key);
          index && removeIdentifiers(index);
        };
      }
    }
  };
  const buildClientSlotFn = (props, children, loc) => createFunctionExpression(
    props,
    children,
    false,
    true,
    children.length ? children[0].loc : loc
  );
  function buildSlots(node, context, buildSlotFn = buildClientSlotFn) {
    context.helper(WITH_CTX);
    const { children, loc } = node;
    const slotsProperties = [];
    const dynamicSlots = [];
    let hasDynamicSlots = context.scopes.vSlot > 0 || context.scopes.vFor > 0;
    const onComponentSlot = findDir(node, "slot", true);
    if (onComponentSlot) {
      const { arg, exp } = onComponentSlot;
      if (arg && !isStaticExp(arg)) {
        hasDynamicSlots = true;
      }
      slotsProperties.push(
        createObjectProperty(
          arg || createSimpleExpression("default", true),
          buildSlotFn(exp, children, loc)
        )
      );
    }
    let hasTemplateSlots = false;
    let hasNamedDefaultSlot = false;
    const implicitDefaultChildren = [];
    const seenSlotNames = /* @__PURE__ */ new Set();
    let conditionalBranchIndex = 0;
    for (let i = 0; i < children.length; i++) {
      const slotElement = children[i];
      let slotDir;
      if (!isTemplateNode(slotElement) || !(slotDir = findDir(slotElement, "slot", true))) {
        if (slotElement.type !== 3) {
          implicitDefaultChildren.push(slotElement);
        }
        continue;
      }
      if (onComponentSlot) {
        context.onError(
          createCompilerError(37, slotDir.loc)
        );
        break;
      }
      hasTemplateSlots = true;
      const { children: slotChildren, loc: slotLoc } = slotElement;
      const {
        arg: slotName = createSimpleExpression(`default`, true),
        exp: slotProps,
        loc: dirLoc
      } = slotDir;
      let staticSlotName;
      if (isStaticExp(slotName)) {
        staticSlotName = slotName ? slotName.content : `default`;
      } else {
        hasDynamicSlots = true;
      }
      const slotFunction = buildSlotFn(slotProps, slotChildren, slotLoc);
      let vIf;
      let vElse;
      let vFor;
      if (vIf = findDir(slotElement, "if")) {
        hasDynamicSlots = true;
        dynamicSlots.push(
          createConditionalExpression(
            vIf.exp,
            buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++),
            defaultFallback
          )
        );
      } else if (vElse = findDir(
        slotElement,
        /^else(-if)?$/,
        true
        /* allowEmpty */
      )) {
        let j = i;
        let prev;
        while (j--) {
          prev = children[j];
          if (prev.type !== 3) {
            break;
          }
        }
        if (prev && isTemplateNode(prev) && findDir(prev, "if")) {
          children.splice(i, 1);
          i--;
          let conditional = dynamicSlots[dynamicSlots.length - 1];
          while (conditional.alternate.type === 19) {
            conditional = conditional.alternate;
          }
          conditional.alternate = vElse.exp ? createConditionalExpression(
            vElse.exp,
            buildDynamicSlot(
              slotName,
              slotFunction,
              conditionalBranchIndex++
            ),
            defaultFallback
          ) : buildDynamicSlot(slotName, slotFunction, conditionalBranchIndex++);
        } else {
          context.onError(
            createCompilerError(30, vElse.loc)
          );
        }
      } else if (vFor = findDir(slotElement, "for")) {
        hasDynamicSlots = true;
        const parseResult = vFor.parseResult || parseForExpression(vFor.exp, context);
        if (parseResult) {
          dynamicSlots.push(
            createCallExpression(context.helper(RENDER_LIST), [
              parseResult.source,
              createFunctionExpression(
                createForLoopParams(parseResult),
                buildDynamicSlot(slotName, slotFunction),
                true
                /* force newline */
              )
            ])
          );
        } else {
          context.onError(
            createCompilerError(32, vFor.loc)
          );
        }
      } else {
        if (staticSlotName) {
          if (seenSlotNames.has(staticSlotName)) {
            context.onError(
              createCompilerError(
                38,
                dirLoc
              )
            );
            continue;
          }
          seenSlotNames.add(staticSlotName);
          if (staticSlotName === "default") {
            hasNamedDefaultSlot = true;
          }
        }
        slotsProperties.push(createObjectProperty(slotName, slotFunction));
      }
    }
    if (!onComponentSlot) {
      const buildDefaultSlotProperty = (props, children2) => {
        const fn = buildSlotFn(props, children2, loc);
        if (context.compatConfig) {
          fn.isNonScopedSlot = true;
        }
        return createObjectProperty(`default`, fn);
      };
      if (!hasTemplateSlots) {
        slotsProperties.push(buildDefaultSlotProperty(void 0, children));
      } else if (implicitDefaultChildren.length && // #3766
      // with whitespace: 'preserve', whitespaces between slots will end up in
      // implicitDefaultChildren. Ignore if all implicit children are whitespaces.
      implicitDefaultChildren.some((node2) => isNonWhitespaceContent(node2))) {
        if (hasNamedDefaultSlot) {
          context.onError(
            createCompilerError(
              39,
              implicitDefaultChildren[0].loc
            )
          );
        } else {
          slotsProperties.push(
            buildDefaultSlotProperty(void 0, implicitDefaultChildren)
          );
        }
      }
    }
    const slotFlag = hasDynamicSlots ? 2 : hasForwardedSlots(node.children) ? 3 : 1;
    let slots = createObjectExpression(
      slotsProperties.concat(
        createObjectProperty(
          `_`,
          // 2 = compiled but dynamic = can skip normalization, but must run diff
          // 1 = compiled and static = can skip normalization AND diff as optimized
          createSimpleExpression(
            slotFlag + (` /* ${slotFlagsText[slotFlag]} */` ),
            false
          )
        )
      ),
      loc
    );
    if (dynamicSlots.length) {
      slots = createCallExpression(context.helper(CREATE_SLOTS), [
        slots,
        createArrayExpression(dynamicSlots)
      ]);
    }
    return {
      slots,
      hasDynamicSlots
    };
  }
  function buildDynamicSlot(name, fn, index) {
    const props = [
      createObjectProperty(`name`, name),
      createObjectProperty(`fn`, fn)
    ];
    if (index != null) {
      props.push(
        createObjectProperty(`key`, createSimpleExpression(String(index), true))
      );
    }
    return createObjectExpression(props);
  }
  function hasForwardedSlots(children) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      switch (child.type) {
        case 1:
          if (child.tagType === 2 || hasForwardedSlots(child.children)) {
            return true;
          }
          break;
        case 9:
          if (hasForwardedSlots(child.branches))
            return true;
          break;
        case 10:
        case 11:
          if (hasForwardedSlots(child.children))
            return true;
          break;
      }
    }
    return false;
  }
  function isNonWhitespaceContent(node) {
    if (node.type !== 2 && node.type !== 12)
      return true;
    return node.type === 2 ? !!node.content.trim() : isNonWhitespaceContent(node.content);
  }

  const directiveImportMap = /* @__PURE__ */ new WeakMap();
  const transformElement = (node, context) => {
    return function postTransformElement() {
      node = context.currentNode;
      if (!(node.type === 1 && (node.tagType === 0 || node.tagType === 1))) {
        return;
      }
      const { tag, props } = node;
      const isComponent = node.tagType === 1;
      let vnodeTag = isComponent ? resolveComponentType(node, context) : `"${tag}"`;
      const isDynamicComponent = isObject(vnodeTag) && vnodeTag.callee === RESOLVE_DYNAMIC_COMPONENT;
      let vnodeProps;
      let vnodeChildren;
      let vnodePatchFlag;
      let patchFlag = 0;
      let vnodeDynamicProps;
      let dynamicPropNames;
      let vnodeDirectives;
      let shouldUseBlock = (
        // dynamic component may resolve to plain elements
        isDynamicComponent || vnodeTag === TELEPORT || vnodeTag === SUSPENSE || !isComponent && // <svg> and <foreignObject> must be forced into blocks so that block
        // updates inside get proper isSVG flag at runtime. (#639, #643)
        // This is technically web-specific, but splitting the logic out of core
        // leads to too much unnecessary complexity.
        (tag === "svg" || tag === "foreignObject")
      );
      if (props.length > 0) {
        const propsBuildResult = buildProps(
          node,
          context,
          void 0,
          isComponent,
          isDynamicComponent
        );
        vnodeProps = propsBuildResult.props;
        patchFlag = propsBuildResult.patchFlag;
        dynamicPropNames = propsBuildResult.dynamicPropNames;
        const directives = propsBuildResult.directives;
        vnodeDirectives = directives && directives.length ? createArrayExpression(
          directives.map((dir) => buildDirectiveArgs(dir, context))
        ) : void 0;
        if (propsBuildResult.shouldUseBlock) {
          shouldUseBlock = true;
        }
      }
      if (node.children.length > 0) {
        if (vnodeTag === KEEP_ALIVE) {
          shouldUseBlock = true;
          patchFlag |= 1024;
          if (node.children.length > 1) {
            context.onError(
              createCompilerError(46, {
                start: node.children[0].loc.start,
                end: node.children[node.children.length - 1].loc.end,
                source: ""
              })
            );
          }
        }
        const shouldBuildAsSlots = isComponent && // Teleport is not a real component and has dedicated runtime handling
        vnodeTag !== TELEPORT && // explained above.
        vnodeTag !== KEEP_ALIVE;
        if (shouldBuildAsSlots) {
          const { slots, hasDynamicSlots } = buildSlots(node, context);
          vnodeChildren = slots;
          if (hasDynamicSlots) {
            patchFlag |= 1024;
          }
        } else if (node.children.length === 1 && vnodeTag !== TELEPORT) {
          const child = node.children[0];
          const type = child.type;
          const hasDynamicTextChild = type === 5 || type === 8;
          if (hasDynamicTextChild && getConstantType(child, context) === 0) {
            patchFlag |= 1;
          }
          if (hasDynamicTextChild || type === 2) {
            vnodeChildren = child;
          } else {
            vnodeChildren = node.children;
          }
        } else {
          vnodeChildren = node.children;
        }
      }
      if (patchFlag !== 0) {
        {
          if (patchFlag < 0) {
            vnodePatchFlag = patchFlag + ` /* ${PatchFlagNames[patchFlag]} */`;
          } else {
            const flagNames = Object.keys(PatchFlagNames).map(Number).filter((n) => n > 0 && patchFlag & n).map((n) => PatchFlagNames[n]).join(`, `);
            vnodePatchFlag = patchFlag + ` /* ${flagNames} */`;
          }
        }
        if (dynamicPropNames && dynamicPropNames.length) {
          vnodeDynamicProps = stringifyDynamicPropNames(dynamicPropNames);
        }
      }
      node.codegenNode = createVNodeCall(
        context,
        vnodeTag,
        vnodeProps,
        vnodeChildren,
        vnodePatchFlag,
        vnodeDynamicProps,
        vnodeDirectives,
        !!shouldUseBlock,
        false,
        isComponent,
        node.loc
      );
    };
  };
  function resolveComponentType(node, context, ssr = false) {
    let { tag } = node;
    const isExplicitDynamic = isComponentTag(tag);
    const isProp = findProp(node, "is");
    if (isProp) {
      if (isExplicitDynamic || isCompatEnabled(
        "COMPILER_IS_ON_ELEMENT",
        context
      )) {
        const exp = isProp.type === 6 ? isProp.value && createSimpleExpression(isProp.value.content, true) : isProp.exp;
        if (exp) {
          return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [
            exp
          ]);
        }
      } else if (isProp.type === 6 && isProp.value.content.startsWith("vue:")) {
        tag = isProp.value.content.slice(4);
      }
    }
    const isDir = !isExplicitDynamic && findDir(node, "is");
    if (isDir && isDir.exp) {
      {
        context.onWarn(
          createCompilerError(52, isDir.loc)
        );
      }
      return createCallExpression(context.helper(RESOLVE_DYNAMIC_COMPONENT), [
        isDir.exp
      ]);
    }
    const builtIn = isCoreComponent(tag) || context.isBuiltInComponent(tag);
    if (builtIn) {
      if (!ssr)
        context.helper(builtIn);
      return builtIn;
    }
    context.helper(RESOLVE_COMPONENT);
    context.components.add(tag);
    return toValidAssetId(tag, `component`);
  }
  function buildProps(node, context, props = node.props, isComponent, isDynamicComponent, ssr = false) {
    const { tag, loc: elementLoc, children } = node;
    let properties = [];
    const mergeArgs = [];
    const runtimeDirectives = [];
    const hasChildren = children.length > 0;
    let shouldUseBlock = false;
    let patchFlag = 0;
    let hasRef = false;
    let hasClassBinding = false;
    let hasStyleBinding = false;
    let hasHydrationEventBinding = false;
    let hasDynamicKeys = false;
    let hasVnodeHook = false;
    const dynamicPropNames = [];
    const pushMergeArg = (arg) => {
      if (properties.length) {
        mergeArgs.push(
          createObjectExpression(dedupeProperties(properties), elementLoc)
        );
        properties = [];
      }
      if (arg)
        mergeArgs.push(arg);
    };
    const analyzePatchFlag = ({ key, value }) => {
      if (isStaticExp(key)) {
        const name = key.content;
        const isEventHandler = isOn(name);
        if (isEventHandler && (!isComponent || isDynamicComponent) && // omit the flag for click handlers because hydration gives click
        // dedicated fast path.
        name.toLowerCase() !== "onclick" && // omit v-model handlers
        name !== "onUpdate:modelValue" && // omit onVnodeXXX hooks
        !isReservedProp(name)) {
          hasHydrationEventBinding = true;
        }
        if (isEventHandler && isReservedProp(name)) {
          hasVnodeHook = true;
        }
        if (value.type === 20 || (value.type === 4 || value.type === 8) && getConstantType(value, context) > 0) {
          return;
        }
        if (name === "ref") {
          hasRef = true;
        } else if (name === "class") {
          hasClassBinding = true;
        } else if (name === "style") {
          hasStyleBinding = true;
        } else if (name !== "key" && !dynamicPropNames.includes(name)) {
          dynamicPropNames.push(name);
        }
        if (isComponent && (name === "class" || name === "style") && !dynamicPropNames.includes(name)) {
          dynamicPropNames.push(name);
        }
      } else {
        hasDynamicKeys = true;
      }
    };
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      if (prop.type === 6) {
        const { loc, name, value } = prop;
        let isStatic = true;
        if (name === "ref") {
          hasRef = true;
          if (context.scopes.vFor > 0) {
            properties.push(
              createObjectProperty(
                createSimpleExpression("ref_for", true),
                createSimpleExpression("true")
              )
            );
          }
        }
        if (name === "is" && (isComponentTag(tag) || value && value.content.startsWith("vue:") || isCompatEnabled(
          "COMPILER_IS_ON_ELEMENT",
          context
        ))) {
          continue;
        }
        properties.push(
          createObjectProperty(
            createSimpleExpression(
              name,
              true,
              getInnerRange(loc, 0, name.length)
            ),
            createSimpleExpression(
              value ? value.content : "",
              isStatic,
              value ? value.loc : loc
            )
          )
        );
      } else {
        const { name, arg, exp, loc } = prop;
        const isVBind = name === "bind";
        const isVOn = name === "on";
        if (name === "slot") {
          if (!isComponent) {
            context.onError(
              createCompilerError(40, loc)
            );
          }
          continue;
        }
        if (name === "once" || name === "memo") {
          continue;
        }
        if (name === "is" || isVBind && isStaticArgOf(arg, "is") && (isComponentTag(tag) || isCompatEnabled(
          "COMPILER_IS_ON_ELEMENT",
          context
        ))) {
          continue;
        }
        if (isVOn && ssr) {
          continue;
        }
        if (
          // #938: elements with dynamic keys should be forced into blocks
          isVBind && isStaticArgOf(arg, "key") || // inline before-update hooks need to force block so that it is invoked
          // before children
          isVOn && hasChildren && isStaticArgOf(arg, "vue:before-update")
        ) {
          shouldUseBlock = true;
        }
        if (isVBind && isStaticArgOf(arg, "ref") && context.scopes.vFor > 0) {
          properties.push(
            createObjectProperty(
              createSimpleExpression("ref_for", true),
              createSimpleExpression("true")
            )
          );
        }
        if (!arg && (isVBind || isVOn)) {
          hasDynamicKeys = true;
          if (exp) {
            if (isVBind) {
              pushMergeArg();
              {
                {
                  const hasOverridableKeys = mergeArgs.some((arg2) => {
                    if (arg2.type === 15) {
                      return arg2.properties.some(({ key }) => {
                        if (key.type !== 4 || !key.isStatic) {
                          return true;
                        }
                        return key.content !== "class" && key.content !== "style" && !isOn(key.content);
                      });
                    } else {
                      return true;
                    }
                  });
                  if (hasOverridableKeys) {
                    checkCompatEnabled(
                      "COMPILER_V_BIND_OBJECT_ORDER",
                      context,
                      loc
                    );
                  }
                }
                if (isCompatEnabled(
                  "COMPILER_V_BIND_OBJECT_ORDER",
                  context
                )) {
                  mergeArgs.unshift(exp);
                  continue;
                }
              }
              mergeArgs.push(exp);
            } else {
              pushMergeArg({
                type: 14,
                loc,
                callee: context.helper(TO_HANDLERS),
                arguments: isComponent ? [exp] : [exp, `true`]
              });
            }
          } else {
            context.onError(
              createCompilerError(
                isVBind ? 34 : 35,
                loc
              )
            );
          }
          continue;
        }
        const directiveTransform = context.directiveTransforms[name];
        if (directiveTransform) {
          const { props: props2, needRuntime } = directiveTransform(prop, node, context);
          !ssr && props2.forEach(analyzePatchFlag);
          if (isVOn && arg && !isStaticExp(arg)) {
            pushMergeArg(createObjectExpression(props2, elementLoc));
          } else {
            properties.push(...props2);
          }
          if (needRuntime) {
            runtimeDirectives.push(prop);
            if (isSymbol(needRuntime)) {
              directiveImportMap.set(prop, needRuntime);
            }
          }
        } else if (!isBuiltInDirective(name)) {
          runtimeDirectives.push(prop);
          if (hasChildren) {
            shouldUseBlock = true;
          }
        }
      }
    }
    let propsExpression = void 0;
    if (mergeArgs.length) {
      pushMergeArg();
      if (mergeArgs.length > 1) {
        propsExpression = createCallExpression(
          context.helper(MERGE_PROPS),
          mergeArgs,
          elementLoc
        );
      } else {
        propsExpression = mergeArgs[0];
      }
    } else if (properties.length) {
      propsExpression = createObjectExpression(
        dedupeProperties(properties),
        elementLoc
      );
    }
    if (hasDynamicKeys) {
      patchFlag |= 16;
    } else {
      if (hasClassBinding && !isComponent) {
        patchFlag |= 2;
      }
      if (hasStyleBinding && !isComponent) {
        patchFlag |= 4;
      }
      if (dynamicPropNames.length) {
        patchFlag |= 8;
      }
      if (hasHydrationEventBinding) {
        patchFlag |= 32;
      }
    }
    if (!shouldUseBlock && (patchFlag === 0 || patchFlag === 32) && (hasRef || hasVnodeHook || runtimeDirectives.length > 0)) {
      patchFlag |= 512;
    }
    if (!context.inSSR && propsExpression) {
      switch (propsExpression.type) {
        case 15:
          let classKeyIndex = -1;
          let styleKeyIndex = -1;
          let hasDynamicKey = false;
          for (let i = 0; i < propsExpression.properties.length; i++) {
            const key = propsExpression.properties[i].key;
            if (isStaticExp(key)) {
              if (key.content === "class") {
                classKeyIndex = i;
              } else if (key.content === "style") {
                styleKeyIndex = i;
              }
            } else if (!key.isHandlerKey) {
              hasDynamicKey = true;
            }
          }
          const classProp = propsExpression.properties[classKeyIndex];
          const styleProp = propsExpression.properties[styleKeyIndex];
          if (!hasDynamicKey) {
            if (classProp && !isStaticExp(classProp.value)) {
              classProp.value = createCallExpression(
                context.helper(NORMALIZE_CLASS),
                [classProp.value]
              );
            }
            if (styleProp && // the static style is compiled into an object,
            // so use `hasStyleBinding` to ensure that it is a dynamic style binding
            (hasStyleBinding || styleProp.value.type === 4 && styleProp.value.content.trim()[0] === `[` || // v-bind:style and style both exist,
            // v-bind:style with static literal object
            styleProp.value.type === 17)) {
              styleProp.value = createCallExpression(
                context.helper(NORMALIZE_STYLE),
                [styleProp.value]
              );
            }
          } else {
            propsExpression = createCallExpression(
              context.helper(NORMALIZE_PROPS),
              [propsExpression]
            );
          }
          break;
        case 14:
          break;
        default:
          propsExpression = createCallExpression(
            context.helper(NORMALIZE_PROPS),
            [
              createCallExpression(context.helper(GUARD_REACTIVE_PROPS), [
                propsExpression
              ])
            ]
          );
          break;
      }
    }
    return {
      props: propsExpression,
      directives: runtimeDirectives,
      patchFlag,
      dynamicPropNames,
      shouldUseBlock
    };
  }
  function dedupeProperties(properties) {
    const knownProps = /* @__PURE__ */ new Map();
    const deduped = [];
    for (let i = 0; i < properties.length; i++) {
      const prop = properties[i];
      if (prop.key.type === 8 || !prop.key.isStatic) {
        deduped.push(prop);
        continue;
      }
      const name = prop.key.content;
      const existing = knownProps.get(name);
      if (existing) {
        if (name === "style" || name === "class" || isOn(name)) {
          mergeAsArray(existing, prop);
        }
      } else {
        knownProps.set(name, prop);
        deduped.push(prop);
      }
    }
    return deduped;
  }
  function mergeAsArray(existing, incoming) {
    if (existing.value.type === 17) {
      existing.value.elements.push(incoming.value);
    } else {
      existing.value = createArrayExpression(
        [existing.value, incoming.value],
        existing.loc
      );
    }
  }
  function buildDirectiveArgs(dir, context) {
    const dirArgs = [];
    const runtime = directiveImportMap.get(dir);
    if (runtime) {
      dirArgs.push(context.helperString(runtime));
    } else {
      {
        context.helper(RESOLVE_DIRECTIVE);
        context.directives.add(dir.name);
        dirArgs.push(toValidAssetId(dir.name, `directive`));
      }
    }
    const { loc } = dir;
    if (dir.exp)
      dirArgs.push(dir.exp);
    if (dir.arg) {
      if (!dir.exp) {
        dirArgs.push(`void 0`);
      }
      dirArgs.push(dir.arg);
    }
    if (Object.keys(dir.modifiers).length) {
      if (!dir.arg) {
        if (!dir.exp) {
          dirArgs.push(`void 0`);
        }
        dirArgs.push(`void 0`);
      }
      const trueExpression = createSimpleExpression(`true`, false, loc);
      dirArgs.push(
        createObjectExpression(
          dir.modifiers.map(
            (modifier) => createObjectProperty(modifier, trueExpression)
          ),
          loc
        )
      );
    }
    return createArrayExpression(dirArgs, dir.loc);
  }
  function stringifyDynamicPropNames(props) {
    let propsNamesString = `[`;
    for (let i = 0, l = props.length; i < l; i++) {
      propsNamesString += JSON.stringify(props[i]);
      if (i < l - 1)
        propsNamesString += ", ";
    }
    return propsNamesString + `]`;
  }
  function isComponentTag(tag) {
    return tag === "component" || tag === "Component";
  }

  const transformSlotOutlet = (node, context) => {
    if (isSlotOutlet(node)) {
      const { children, loc } = node;
      const { slotName, slotProps } = processSlotOutlet(node, context);
      const slotArgs = [
        context.prefixIdentifiers ? `_ctx.$slots` : `$slots`,
        slotName,
        "{}",
        "undefined",
        "true"
      ];
      let expectedLen = 2;
      if (slotProps) {
        slotArgs[2] = slotProps;
        expectedLen = 3;
      }
      if (children.length) {
        slotArgs[3] = createFunctionExpression([], children, false, false, loc);
        expectedLen = 4;
      }
      if (context.scopeId && !context.slotted) {
        expectedLen = 5;
      }
      slotArgs.splice(expectedLen);
      node.codegenNode = createCallExpression(
        context.helper(RENDER_SLOT),
        slotArgs,
        loc
      );
    }
  };
  function processSlotOutlet(node, context) {
    let slotName = `"default"`;
    let slotProps = void 0;
    const nonNameProps = [];
    for (let i = 0; i < node.props.length; i++) {
      const p = node.props[i];
      if (p.type === 6) {
        if (p.value) {
          if (p.name === "name") {
            slotName = JSON.stringify(p.value.content);
          } else {
            p.name = camelize(p.name);
            nonNameProps.push(p);
          }
        }
      } else {
        if (p.name === "bind" && isStaticArgOf(p.arg, "name")) {
          if (p.exp)
            slotName = p.exp;
        } else {
          if (p.name === "bind" && p.arg && isStaticExp(p.arg)) {
            p.arg.content = camelize(p.arg.content);
          }
          nonNameProps.push(p);
        }
      }
    }
    if (nonNameProps.length > 0) {
      const { props, directives } = buildProps(
        node,
        context,
        nonNameProps,
        false,
        false
      );
      slotProps = props;
      if (directives.length) {
        context.onError(
          createCompilerError(
            36,
            directives[0].loc
          )
        );
      }
    }
    return {
      slotName,
      slotProps
    };
  }

  const fnExpRE = /^\s*([\w$_]+|(async\s*)?\([^)]*?\))\s*(:[^=]+)?=>|^\s*(async\s+)?function(?:\s+[\w$]+)?\s*\(/;
  const transformOn$1 = (dir, node, context, augmentor) => {
    const { loc, modifiers, arg } = dir;
    if (!dir.exp && !modifiers.length) {
      context.onError(createCompilerError(35, loc));
    }
    let eventName;
    if (arg.type === 4) {
      if (arg.isStatic) {
        let rawName = arg.content;
        if (rawName.startsWith("vnode")) {
          context.onWarn(
            createCompilerError(51, arg.loc)
          );
        }
        if (rawName.startsWith("vue:")) {
          rawName = `vnode-${rawName.slice(4)}`;
        }
        const eventString = node.tagType !== 0 || rawName.startsWith("vnode") || !/[A-Z]/.test(rawName) ? (
          // for non-element and vnode lifecycle event listeners, auto convert
          // it to camelCase. See issue #2249
          toHandlerKey(camelize(rawName))
        ) : (
          // preserve case for plain element listeners that have uppercase
          // letters, as these may be custom elements' custom events
          `on:${rawName}`
        );
        eventName = createSimpleExpression(eventString, true, arg.loc);
      } else {
        eventName = createCompoundExpression([
          `${context.helperString(TO_HANDLER_KEY)}(`,
          arg,
          `)`
        ]);
      }
    } else {
      eventName = arg;
      eventName.children.unshift(`${context.helperString(TO_HANDLER_KEY)}(`);
      eventName.children.push(`)`);
    }
    let exp = dir.exp;
    if (exp && !exp.content.trim()) {
      exp = void 0;
    }
    let shouldCache = context.cacheHandlers && !exp && !context.inVOnce;
    if (exp) {
      const isMemberExp = isMemberExpression(exp.content);
      const isInlineStatement = !(isMemberExp || fnExpRE.test(exp.content));
      const hasMultipleStatements = exp.content.includes(`;`);
      {
        validateBrowserExpression(
          exp,
          context,
          false,
          hasMultipleStatements
        );
      }
      if (isInlineStatement || shouldCache && isMemberExp) {
        exp = createCompoundExpression([
          `${isInlineStatement ? `$event` : `${``}(...args)`} => ${hasMultipleStatements ? `{` : `(`}`,
          exp,
          hasMultipleStatements ? `}` : `)`
        ]);
      }
    }
    let ret = {
      props: [
        createObjectProperty(
          eventName,
          exp || createSimpleExpression(`() => {}`, false, loc)
        )
      ]
    };
    if (augmentor) {
      ret = augmentor(ret);
    }
    if (shouldCache) {
      ret.props[0].value = context.cache(ret.props[0].value);
    }
    ret.props.forEach((p) => p.key.isHandlerKey = true);
    return ret;
  };

  const transformBind = (dir, _node, context) => {
    const { exp, modifiers, loc } = dir;
    const arg = dir.arg;
    if (arg.type !== 4) {
      arg.children.unshift(`(`);
      arg.children.push(`) || ""`);
    } else if (!arg.isStatic) {
      arg.content = `${arg.content} || ""`;
    }
    if (modifiers.includes("camel")) {
      if (arg.type === 4) {
        if (arg.isStatic) {
          arg.content = camelize(arg.content);
        } else {
          arg.content = `${context.helperString(CAMELIZE)}(${arg.content})`;
        }
      } else {
        arg.children.unshift(`${context.helperString(CAMELIZE)}(`);
        arg.children.push(`)`);
      }
    }
    if (!context.inSSR) {
      if (modifiers.includes("prop")) {
        injectPrefix(arg, ".");
      }
      if (modifiers.includes("attr")) {
        injectPrefix(arg, "^");
      }
    }
    if (!exp || exp.type === 4 && !exp.content.trim()) {
      context.onError(createCompilerError(34, loc));
      return {
        props: [createObjectProperty(arg, createSimpleExpression("", true, loc))]
      };
    }
    return {
      props: [createObjectProperty(arg, exp)]
    };
  };
  const injectPrefix = (arg, prefix) => {
    if (arg.type === 4) {
      if (arg.isStatic) {
        arg.content = prefix + arg.content;
      } else {
        arg.content = `\`${prefix}\${${arg.content}}\``;
      }
    } else {
      arg.children.unshift(`'${prefix}' + (`);
      arg.children.push(`)`);
    }
  };

  const transformText = (node, context) => {
    if (node.type === 0 || node.type === 1 || node.type === 11 || node.type === 10) {
      return () => {
        const children = node.children;
        let currentContainer = void 0;
        let hasText = false;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (isText$1(child)) {
            hasText = true;
            for (let j = i + 1; j < children.length; j++) {
              const next = children[j];
              if (isText$1(next)) {
                if (!currentContainer) {
                  currentContainer = children[i] = createCompoundExpression(
                    [child],
                    child.loc
                  );
                }
                currentContainer.children.push(` + `, next);
                children.splice(j, 1);
                j--;
              } else {
                currentContainer = void 0;
                break;
              }
            }
          }
        }
        if (!hasText || // if this is a plain element with a single text child, leave it
        // as-is since the runtime has dedicated fast path for this by directly
        // setting textContent of the element.
        // for component root it's always normalized anyway.
        children.length === 1 && (node.type === 0 || node.type === 1 && node.tagType === 0 && // #3756
        // custom directives can potentially add DOM elements arbitrarily,
        // we need to avoid setting textContent of the element at runtime
        // to avoid accidentally overwriting the DOM elements added
        // by the user through custom directives.
        !node.props.find(
          (p) => p.type === 7 && !context.directiveTransforms[p.name]
        ) && // in compat mode, <template> tags with no special directives
        // will be rendered as a fragment so its children must be
        // converted into vnodes.
        !(node.tag === "template"))) {
          return;
        }
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          if (isText$1(child) || child.type === 8) {
            const callArgs = [];
            if (child.type !== 2 || child.content !== " ") {
              callArgs.push(child);
            }
            if (!context.ssr && getConstantType(child, context) === 0) {
              callArgs.push(
                1 + (` /* ${PatchFlagNames[1]} */` )
              );
            }
            children[i] = {
              type: 12,
              content: child,
              loc: child.loc,
              codegenNode: createCallExpression(
                context.helper(CREATE_TEXT),
                callArgs
              )
            };
          }
        }
      };
    }
  };

  const seen$1 = /* @__PURE__ */ new WeakSet();
  const transformOnce = (node, context) => {
    if (node.type === 1 && findDir(node, "once", true)) {
      if (seen$1.has(node) || context.inVOnce || context.inSSR) {
        return;
      }
      seen$1.add(node);
      context.inVOnce = true;
      context.helper(SET_BLOCK_TRACKING);
      return () => {
        context.inVOnce = false;
        const cur = context.currentNode;
        if (cur.codegenNode) {
          cur.codegenNode = context.cache(
            cur.codegenNode,
            true
            /* isVNode */
          );
        }
      };
    }
  };

  const transformModel$1 = (dir, node, context) => {
    const { exp, arg } = dir;
    if (!exp) {
      context.onError(
        createCompilerError(41, dir.loc)
      );
      return createTransformProps();
    }
    const rawExp = exp.loc.source;
    const expString = exp.type === 4 ? exp.content : rawExp;
    const bindingType = context.bindingMetadata[rawExp];
    if (bindingType === "props" || bindingType === "props-aliased") {
      context.onError(createCompilerError(44, exp.loc));
      return createTransformProps();
    }
    const maybeRef = false;
    if (!expString.trim() || !isMemberExpression(expString) && !maybeRef) {
      context.onError(
        createCompilerError(42, exp.loc)
      );
      return createTransformProps();
    }
    const propName = arg ? arg : createSimpleExpression("modelValue", true);
    const eventName = arg ? isStaticExp(arg) ? `onUpdate:${camelize(arg.content)}` : createCompoundExpression(['"onUpdate:" + ', arg]) : `onUpdate:modelValue`;
    let assignmentExp;
    const eventArg = context.isTS ? `($event: any)` : `$event`;
    {
      assignmentExp = createCompoundExpression([
        `${eventArg} => ((`,
        exp,
        `) = $event)`
      ]);
    }
    const props = [
      // modelValue: foo
      createObjectProperty(propName, dir.exp),
      // "onUpdate:modelValue": $event => (foo = $event)
      createObjectProperty(eventName, assignmentExp)
    ];
    if (dir.modifiers.length && node.tagType === 1) {
      const modifiers = dir.modifiers.map((m) => (isSimpleIdentifier(m) ? m : JSON.stringify(m)) + `: true`).join(`, `);
      const modifiersKey = arg ? isStaticExp(arg) ? `${arg.content}Modifiers` : createCompoundExpression([arg, ' + "Modifiers"']) : `modelModifiers`;
      props.push(
        createObjectProperty(
          modifiersKey,
          createSimpleExpression(
            `{ ${modifiers} }`,
            false,
            dir.loc,
            2
          )
        )
      );
    }
    return createTransformProps(props);
  };
  function createTransformProps(props = []) {
    return { props };
  }

  const validDivisionCharRE = /[\w).+\-_$\]]/;
  const transformFilter = (node, context) => {
    if (!isCompatEnabled("COMPILER_FILTER", context)) {
      return;
    }
    if (node.type === 5) {
      rewriteFilter(node.content, context);
    }
    if (node.type === 1) {
      node.props.forEach((prop) => {
        if (prop.type === 7 && prop.name !== "for" && prop.exp) {
          rewriteFilter(prop.exp, context);
        }
      });
    }
  };
  function rewriteFilter(node, context) {
    if (node.type === 4) {
      parseFilter(node, context);
    } else {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        if (typeof child !== "object")
          continue;
        if (child.type === 4) {
          parseFilter(child, context);
        } else if (child.type === 8) {
          rewriteFilter(node, context);
        } else if (child.type === 5) {
          rewriteFilter(child.content, context);
        }
      }
    }
  }
  function parseFilter(node, context) {
    const exp = node.content;
    let inSingle = false;
    let inDouble = false;
    let inTemplateString = false;
    let inRegex = false;
    let curly = 0;
    let square = 0;
    let paren = 0;
    let lastFilterIndex = 0;
    let c, prev, i, expression, filters = [];
    for (i = 0; i < exp.length; i++) {
      prev = c;
      c = exp.charCodeAt(i);
      if (inSingle) {
        if (c === 39 && prev !== 92)
          inSingle = false;
      } else if (inDouble) {
        if (c === 34 && prev !== 92)
          inDouble = false;
      } else if (inTemplateString) {
        if (c === 96 && prev !== 92)
          inTemplateString = false;
      } else if (inRegex) {
        if (c === 47 && prev !== 92)
          inRegex = false;
      } else if (c === 124 && // pipe
      exp.charCodeAt(i + 1) !== 124 && exp.charCodeAt(i - 1) !== 124 && !curly && !square && !paren) {
        if (expression === void 0) {
          lastFilterIndex = i + 1;
          expression = exp.slice(0, i).trim();
        } else {
          pushFilter();
        }
      } else {
        switch (c) {
          case 34:
            inDouble = true;
            break;
          case 39:
            inSingle = true;
            break;
          case 96:
            inTemplateString = true;
            break;
          case 40:
            paren++;
            break;
          case 41:
            paren--;
            break;
          case 91:
            square++;
            break;
          case 93:
            square--;
            break;
          case 123:
            curly++;
            break;
          case 125:
            curly--;
            break;
        }
        if (c === 47) {
          let j = i - 1;
          let p;
          for (; j >= 0; j--) {
            p = exp.charAt(j);
            if (p !== " ")
              break;
          }
          if (!p || !validDivisionCharRE.test(p)) {
            inRegex = true;
          }
        }
      }
    }
    if (expression === void 0) {
      expression = exp.slice(0, i).trim();
    } else if (lastFilterIndex !== 0) {
      pushFilter();
    }
    function pushFilter() {
      filters.push(exp.slice(lastFilterIndex, i).trim());
      lastFilterIndex = i + 1;
    }
    if (filters.length) {
      warnDeprecation(
        "COMPILER_FILTER",
        context,
        node.loc
      );
      for (i = 0; i < filters.length; i++) {
        expression = wrapFilter(expression, filters[i], context);
      }
      node.content = expression;
    }
  }
  function wrapFilter(exp, filter, context) {
    context.helper(RESOLVE_FILTER);
    const i = filter.indexOf("(");
    if (i < 0) {
      context.filters.add(filter);
      return `${toValidAssetId(filter, "filter")}(${exp})`;
    } else {
      const name = filter.slice(0, i);
      const args = filter.slice(i + 1);
      context.filters.add(name);
      return `${toValidAssetId(name, "filter")}(${exp}${args !== ")" ? "," + args : args}`;
    }
  }

  const seen = /* @__PURE__ */ new WeakSet();
  const transformMemo = (node, context) => {
    if (node.type === 1) {
      const dir = findDir(node, "memo");
      if (!dir || seen.has(node)) {
        return;
      }
      seen.add(node);
      return () => {
        const codegenNode = node.codegenNode || context.currentNode.codegenNode;
        if (codegenNode && codegenNode.type === 13) {
          if (node.tagType !== 1) {
            convertToBlock(codegenNode, context);
          }
          node.codegenNode = createCallExpression(context.helper(WITH_MEMO), [
            dir.exp,
            createFunctionExpression(void 0, codegenNode),
            `_cache`,
            String(context.cached++)
          ]);
        }
      };
    }
  };

  function getBaseTransformPreset(prefixIdentifiers) {
    return [
      [
        transformOnce,
        transformIf,
        transformMemo,
        transformFor,
        ...[transformFilter] ,
        ...[transformExpression] ,
        transformSlotOutlet,
        transformElement,
        trackSlotScopes,
        transformText
      ],
      {
        on: transformOn$1,
        bind: transformBind,
        model: transformModel$1
      }
    ];
  }
  function baseCompile(template, options = {}) {
    const onError = options.onError || defaultOnError;
    const isModuleMode = options.mode === "module";
    {
      if (options.prefixIdentifiers === true) {
        onError(createCompilerError(47));
      } else if (isModuleMode) {
        onError(createCompilerError(48));
      }
    }
    const prefixIdentifiers = false;
    if (options.cacheHandlers) {
      onError(createCompilerError(49));
    }
    if (options.scopeId && !isModuleMode) {
      onError(createCompilerError(50));
    }
    const ast = isString(template) ? baseParse(template, options) : template;
    const [nodeTransforms, directiveTransforms] = getBaseTransformPreset();
    transform(
      ast,
      extend({}, options, {
        prefixIdentifiers,
        nodeTransforms: [
          ...nodeTransforms,
          ...options.nodeTransforms || []
          // user transforms
        ],
        directiveTransforms: extend(
          {},
          directiveTransforms,
          options.directiveTransforms || {}
          // user transforms
        )
      })
    );
    return generate(
      ast,
      extend({}, options, {
        prefixIdentifiers
      })
    );
  }

  const noopDirectiveTransform = () => ({ props: [] });

  const V_MODEL_RADIO = Symbol(`vModelRadio` );
  const V_MODEL_CHECKBOX = Symbol(`vModelCheckbox` );
  const V_MODEL_TEXT = Symbol(`vModelText` );
  const V_MODEL_SELECT = Symbol(`vModelSelect` );
  const V_MODEL_DYNAMIC = Symbol(`vModelDynamic` );
  const V_ON_WITH_MODIFIERS = Symbol(`vOnModifiersGuard` );
  const V_ON_WITH_KEYS = Symbol(`vOnKeysGuard` );
  const V_SHOW = Symbol(`vShow` );
  const TRANSITION = Symbol(`Transition` );
  const TRANSITION_GROUP = Symbol(`TransitionGroup` );
  registerRuntimeHelpers({
    [V_MODEL_RADIO]: `vModelRadio`,
    [V_MODEL_CHECKBOX]: `vModelCheckbox`,
    [V_MODEL_TEXT]: `vModelText`,
    [V_MODEL_SELECT]: `vModelSelect`,
    [V_MODEL_DYNAMIC]: `vModelDynamic`,
    [V_ON_WITH_MODIFIERS]: `withModifiers`,
    [V_ON_WITH_KEYS]: `withKeys`,
    [V_SHOW]: `vShow`,
    [TRANSITION]: `Transition`,
    [TRANSITION_GROUP]: `TransitionGroup`
  });

  let decoder;
  function decodeHtmlBrowser(raw, asAttr = false) {
    if (!decoder) {
      decoder = document.createElement("div");
    }
    if (asAttr) {
      decoder.innerHTML = `<div foo="${raw.replace(/"/g, "&quot;")}">`;
      return decoder.children[0].getAttribute("foo");
    } else {
      decoder.innerHTML = raw;
      return decoder.textContent;
    }
  }

  const isRawTextContainer = /* @__PURE__ */ makeMap(
    "style,iframe,script,noscript",
    true
  );
  const parserOptions = {
    isVoidTag,
    isNativeTag: (tag) => isHTMLTag(tag) || isSVGTag(tag),
    isPreTag: (tag) => tag === "pre",
    decodeEntities: decodeHtmlBrowser ,
    isBuiltInComponent: (tag) => {
      if (isBuiltInType(tag, `Transition`)) {
        return TRANSITION;
      } else if (isBuiltInType(tag, `TransitionGroup`)) {
        return TRANSITION_GROUP;
      }
    },
    // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction-dispatcher
    getNamespace(tag, parent) {
      let ns = parent ? parent.ns : 0;
      if (parent && ns === 2) {
        if (parent.tag === "annotation-xml") {
          if (tag === "svg") {
            return 1;
          }
          if (parent.props.some(
            (a) => a.type === 6 && a.name === "encoding" && a.value != null && (a.value.content === "text/html" || a.value.content === "application/xhtml+xml")
          )) {
            ns = 0;
          }
        } else if (/^m(?:[ions]|text)$/.test(parent.tag) && tag !== "mglyph" && tag !== "malignmark") {
          ns = 0;
        }
      } else if (parent && ns === 1) {
        if (parent.tag === "foreignObject" || parent.tag === "desc" || parent.tag === "title") {
          ns = 0;
        }
      }
      if (ns === 0) {
        if (tag === "svg") {
          return 1;
        }
        if (tag === "math") {
          return 2;
        }
      }
      return ns;
    },
    // https://html.spec.whatwg.org/multipage/parsing.html#parsing-html-fragments
    getTextMode({ tag, ns }) {
      if (ns === 0) {
        if (tag === "textarea" || tag === "title") {
          return 1;
        }
        if (isRawTextContainer(tag)) {
          return 2;
        }
      }
      return 0;
    }
  };

  const transformStyle = (node) => {
    if (node.type === 1) {
      node.props.forEach((p, i) => {
        if (p.type === 6 && p.name === "style" && p.value) {
          node.props[i] = {
            type: 7,
            name: `bind`,
            arg: createSimpleExpression(`style`, true, p.loc),
            exp: parseInlineCSS(p.value.content, p.loc),
            modifiers: [],
            loc: p.loc
          };
        }
      });
    }
  };
  const parseInlineCSS = (cssText, loc) => {
    const normalized = parseStringStyle(cssText);
    return createSimpleExpression(
      JSON.stringify(normalized),
      false,
      loc,
      3
    );
  };

  function createDOMCompilerError(code, loc) {
    return createCompilerError(
      code,
      loc,
      DOMErrorMessages 
    );
  }
  const DOMErrorMessages = {
    [53]: `v-html is missing expression.`,
    [54]: `v-html will override element children.`,
    [55]: `v-text is missing expression.`,
    [56]: `v-text will override element children.`,
    [57]: `v-model can only be used on <input>, <textarea> and <select> elements.`,
    [58]: `v-model argument is not supported on plain elements.`,
    [59]: `v-model cannot be used on file inputs since they are read-only. Use a v-on:change listener instead.`,
    [60]: `Unnecessary value binding used alongside v-model. It will interfere with v-model's behavior.`,
    [61]: `v-show is missing expression.`,
    [62]: `<Transition> expects exactly one child element or component.`,
    [63]: `Tags with side effect (<script> and <style>) are ignored in client component templates.`
  };

  const transformVHtml = (dir, node, context) => {
    const { exp, loc } = dir;
    if (!exp) {
      context.onError(
        createDOMCompilerError(53, loc)
      );
    }
    if (node.children.length) {
      context.onError(
        createDOMCompilerError(54, loc)
      );
      node.children.length = 0;
    }
    return {
      props: [
        createObjectProperty(
          createSimpleExpression(`innerHTML`, true, loc),
          exp || createSimpleExpression("", true)
        )
      ]
    };
  };

  const transformVText = (dir, node, context) => {
    const { exp, loc } = dir;
    if (!exp) {
      context.onError(
        createDOMCompilerError(55, loc)
      );
    }
    if (node.children.length) {
      context.onError(
        createDOMCompilerError(56, loc)
      );
      node.children.length = 0;
    }
    return {
      props: [
        createObjectProperty(
          createSimpleExpression(`textContent`, true),
          exp ? getConstantType(exp, context) > 0 ? exp : createCallExpression(
            context.helperString(TO_DISPLAY_STRING),
            [exp],
            loc
          ) : createSimpleExpression("", true)
        )
      ]
    };
  };

  const transformModel = (dir, node, context) => {
    const baseResult = transformModel$1(dir, node, context);
    if (!baseResult.props.length || node.tagType === 1) {
      return baseResult;
    }
    if (dir.arg) {
      context.onError(
        createDOMCompilerError(
          58,
          dir.arg.loc
        )
      );
    }
    function checkDuplicatedValue() {
      const value = findProp(node, "value");
      if (value) {
        context.onError(
          createDOMCompilerError(
            60,
            value.loc
          )
        );
      }
    }
    const { tag } = node;
    const isCustomElement = context.isCustomElement(tag);
    if (tag === "input" || tag === "textarea" || tag === "select" || isCustomElement) {
      let directiveToUse = V_MODEL_TEXT;
      let isInvalidType = false;
      if (tag === "input" || isCustomElement) {
        const type = findProp(node, `type`);
        if (type) {
          if (type.type === 7) {
            directiveToUse = V_MODEL_DYNAMIC;
          } else if (type.value) {
            switch (type.value.content) {
              case "radio":
                directiveToUse = V_MODEL_RADIO;
                break;
              case "checkbox":
                directiveToUse = V_MODEL_CHECKBOX;
                break;
              case "file":
                isInvalidType = true;
                context.onError(
                  createDOMCompilerError(
                    59,
                    dir.loc
                  )
                );
                break;
              default:
                checkDuplicatedValue();
                break;
            }
          }
        } else if (hasDynamicKeyVBind(node)) {
          directiveToUse = V_MODEL_DYNAMIC;
        } else {
          checkDuplicatedValue();
        }
      } else if (tag === "select") {
        directiveToUse = V_MODEL_SELECT;
      } else {
        checkDuplicatedValue();
      }
      if (!isInvalidType) {
        baseResult.needRuntime = context.helper(directiveToUse);
      }
    } else {
      context.onError(
        createDOMCompilerError(
          57,
          dir.loc
        )
      );
    }
    baseResult.props = baseResult.props.filter(
      (p) => !(p.key.type === 4 && p.key.content === "modelValue")
    );
    return baseResult;
  };

  const isEventOptionModifier = /* @__PURE__ */ makeMap(`passive,once,capture`);
  const isNonKeyModifier = /* @__PURE__ */ makeMap(
    // event propagation management
    `stop,prevent,self,ctrl,shift,alt,meta,exact,middle`
  );
  const maybeKeyModifier = /* @__PURE__ */ makeMap("left,right");
  const isKeyboardEvent = /* @__PURE__ */ makeMap(
    `onkeyup,onkeydown,onkeypress`,
    true
  );
  const resolveModifiers = (key, modifiers, context, loc) => {
    const keyModifiers = [];
    const nonKeyModifiers = [];
    const eventOptionModifiers = [];
    for (let i = 0; i < modifiers.length; i++) {
      const modifier = modifiers[i];
      if (modifier === "native" && checkCompatEnabled(
        "COMPILER_V_ON_NATIVE",
        context,
        loc
      )) {
        eventOptionModifiers.push(modifier);
      } else if (isEventOptionModifier(modifier)) {
        eventOptionModifiers.push(modifier);
      } else {
        if (maybeKeyModifier(modifier)) {
          if (isStaticExp(key)) {
            if (isKeyboardEvent(key.content)) {
              keyModifiers.push(modifier);
            } else {
              nonKeyModifiers.push(modifier);
            }
          } else {
            keyModifiers.push(modifier);
            nonKeyModifiers.push(modifier);
          }
        } else {
          if (isNonKeyModifier(modifier)) {
            nonKeyModifiers.push(modifier);
          } else {
            keyModifiers.push(modifier);
          }
        }
      }
    }
    return {
      keyModifiers,
      nonKeyModifiers,
      eventOptionModifiers
    };
  };
  const transformClick = (key, event) => {
    const isStaticClick = isStaticExp(key) && key.content.toLowerCase() === "onclick";
    return isStaticClick ? createSimpleExpression(event, true) : key.type !== 4 ? createCompoundExpression([
      `(`,
      key,
      `) === "onClick" ? "${event}" : (`,
      key,
      `)`
    ]) : key;
  };
  const transformOn = (dir, node, context) => {
    return transformOn$1(dir, node, context, (baseResult) => {
      const { modifiers } = dir;
      if (!modifiers.length)
        return baseResult;
      let { key, value: handlerExp } = baseResult.props[0];
      const { keyModifiers, nonKeyModifiers, eventOptionModifiers } = resolveModifiers(key, modifiers, context, dir.loc);
      if (nonKeyModifiers.includes("right")) {
        key = transformClick(key, `onContextmenu`);
      }
      if (nonKeyModifiers.includes("middle")) {
        key = transformClick(key, `onMouseup`);
      }
      if (nonKeyModifiers.length) {
        handlerExp = createCallExpression(context.helper(V_ON_WITH_MODIFIERS), [
          handlerExp,
          JSON.stringify(nonKeyModifiers)
        ]);
      }
      if (keyModifiers.length && // if event name is dynamic, always wrap with keys guard
      (!isStaticExp(key) || isKeyboardEvent(key.content))) {
        handlerExp = createCallExpression(context.helper(V_ON_WITH_KEYS), [
          handlerExp,
          JSON.stringify(keyModifiers)
        ]);
      }
      if (eventOptionModifiers.length) {
        const modifierPostfix = eventOptionModifiers.map(capitalize).join("");
        key = isStaticExp(key) ? createSimpleExpression(`${key.content}${modifierPostfix}`, true) : createCompoundExpression([`(`, key, `) + "${modifierPostfix}"`]);
      }
      return {
        props: [createObjectProperty(key, handlerExp)]
      };
    });
  };

  const transformShow = (dir, node, context) => {
    const { exp, loc } = dir;
    if (!exp) {
      context.onError(
        createDOMCompilerError(61, loc)
      );
    }
    return {
      props: [],
      needRuntime: context.helper(V_SHOW)
    };
  };

  const transformTransition = (node, context) => {
    if (node.type === 1 && node.tagType === 1) {
      const component = context.isBuiltInComponent(node.tag);
      if (component === TRANSITION) {
        return () => {
          if (!node.children.length) {
            return;
          }
          if (hasMultipleChildren(node)) {
            context.onError(
              createDOMCompilerError(
                62,
                {
                  start: node.children[0].loc.start,
                  end: node.children[node.children.length - 1].loc.end,
                  source: ""
                }
              )
            );
          }
          const child = node.children[0];
          if (child.type === 1) {
            for (const p of child.props) {
              if (p.type === 7 && p.name === "show") {
                node.props.push({
                  type: 6,
                  name: "persisted",
                  value: void 0,
                  loc: node.loc
                });
              }
            }
          }
        };
      }
    }
  };
  function hasMultipleChildren(node) {
    const children = node.children = node.children.filter(
      (c) => c.type !== 3 && !(c.type === 2 && !c.content.trim())
    );
    const child = children[0];
    return children.length !== 1 || child.type === 11 || child.type === 9 && child.branches.some(hasMultipleChildren);
  }

  const ignoreSideEffectTags = (node, context) => {
    if (node.type === 1 && node.tagType === 0 && (node.tag === "script" || node.tag === "style")) {
      context.onError(
        createDOMCompilerError(
          63,
          node.loc
        )
      );
      context.removeNode();
    }
  };

  const DOMNodeTransforms = [
    transformStyle,
    ...[transformTransition] 
  ];
  const DOMDirectiveTransforms = {
    cloak: noopDirectiveTransform,
    html: transformVHtml,
    text: transformVText,
    model: transformModel,
    // override compiler-core
    on: transformOn,
    // override compiler-core
    show: transformShow
  };
  function compile(template, options = {}) {
    return baseCompile(
      template,
      extend({}, parserOptions, options, {
        nodeTransforms: [
          // ignore <script> and <tag>
          // this is not put inside DOMNodeTransforms because that list is used
          // by compiler-ssr to generate vnode fallback branches
          ignoreSideEffectTags,
          ...DOMNodeTransforms,
          ...options.nodeTransforms || []
        ],
        directiveTransforms: extend(
          {},
          DOMDirectiveTransforms,
          options.directiveTransforms || {}
        ),
        transformHoist: null 
      })
    );
  }
  function parse(template, options = {}) {
    return baseParse(template, extend({}, parserOptions, options));
  }

  exports.BASE_TRANSITION = BASE_TRANSITION;
  exports.CAMELIZE = CAMELIZE;
  exports.CAPITALIZE = CAPITALIZE;
  exports.CREATE_BLOCK = CREATE_BLOCK;
  exports.CREATE_COMMENT = CREATE_COMMENT;
  exports.CREATE_ELEMENT_BLOCK = CREATE_ELEMENT_BLOCK;
  exports.CREATE_ELEMENT_VNODE = CREATE_ELEMENT_VNODE;
  exports.CREATE_SLOTS = CREATE_SLOTS;
  exports.CREATE_STATIC = CREATE_STATIC;
  exports.CREATE_TEXT = CREATE_TEXT;
  exports.CREATE_VNODE = CREATE_VNODE;
  exports.DOMDirectiveTransforms = DOMDirectiveTransforms;
  exports.DOMNodeTransforms = DOMNodeTransforms;
  exports.FRAGMENT = FRAGMENT;
  exports.GUARD_REACTIVE_PROPS = GUARD_REACTIVE_PROPS;
  exports.IS_MEMO_SAME = IS_MEMO_SAME;
  exports.IS_REF = IS_REF;
  exports.KEEP_ALIVE = KEEP_ALIVE;
  exports.MERGE_PROPS = MERGE_PROPS;
  exports.NORMALIZE_CLASS = NORMALIZE_CLASS;
  exports.NORMALIZE_PROPS = NORMALIZE_PROPS;
  exports.NORMALIZE_STYLE = NORMALIZE_STYLE;
  exports.OPEN_BLOCK = OPEN_BLOCK;
  exports.POP_SCOPE_ID = POP_SCOPE_ID;
  exports.PUSH_SCOPE_ID = PUSH_SCOPE_ID;
  exports.RENDER_LIST = RENDER_LIST;
  exports.RENDER_SLOT = RENDER_SLOT;
  exports.RESOLVE_COMPONENT = RESOLVE_COMPONENT;
  exports.RESOLVE_DIRECTIVE = RESOLVE_DIRECTIVE;
  exports.RESOLVE_DYNAMIC_COMPONENT = RESOLVE_DYNAMIC_COMPONENT;
  exports.RESOLVE_FILTER = RESOLVE_FILTER;
  exports.SET_BLOCK_TRACKING = SET_BLOCK_TRACKING;
  exports.SUSPENSE = SUSPENSE;
  exports.TELEPORT = TELEPORT;
  exports.TO_DISPLAY_STRING = TO_DISPLAY_STRING;
  exports.TO_HANDLERS = TO_HANDLERS;
  exports.TO_HANDLER_KEY = TO_HANDLER_KEY;
  exports.TRANSITION = TRANSITION;
  exports.TRANSITION_GROUP = TRANSITION_GROUP;
  exports.TS_NODE_TYPES = TS_NODE_TYPES;
  exports.UNREF = UNREF;
  exports.V_MODEL_CHECKBOX = V_MODEL_CHECKBOX;
  exports.V_MODEL_DYNAMIC = V_MODEL_DYNAMIC;
  exports.V_MODEL_RADIO = V_MODEL_RADIO;
  exports.V_MODEL_SELECT = V_MODEL_SELECT;
  exports.V_MODEL_TEXT = V_MODEL_TEXT;
  exports.V_ON_WITH_KEYS = V_ON_WITH_KEYS;
  exports.V_ON_WITH_MODIFIERS = V_ON_WITH_MODIFIERS;
  exports.V_SHOW = V_SHOW;
  exports.WITH_CTX = WITH_CTX;
  exports.WITH_DIRECTIVES = WITH_DIRECTIVES;
  exports.WITH_MEMO = WITH_MEMO;
  exports.advancePositionWithClone = advancePositionWithClone;
  exports.advancePositionWithMutation = advancePositionWithMutation;
  exports.assert = assert;
  exports.baseCompile = baseCompile;
  exports.baseParse = baseParse;
  exports.buildDirectiveArgs = buildDirectiveArgs;
  exports.buildProps = buildProps;
  exports.buildSlots = buildSlots;
  exports.checkCompatEnabled = checkCompatEnabled;
  exports.compile = compile;
  exports.convertToBlock = convertToBlock;
  exports.createArrayExpression = createArrayExpression;
  exports.createAssignmentExpression = createAssignmentExpression;
  exports.createBlockStatement = createBlockStatement;
  exports.createCacheExpression = createCacheExpression;
  exports.createCallExpression = createCallExpression;
  exports.createCompilerError = createCompilerError;
  exports.createCompoundExpression = createCompoundExpression;
  exports.createConditionalExpression = createConditionalExpression;
  exports.createDOMCompilerError = createDOMCompilerError;
  exports.createForLoopParams = createForLoopParams;
  exports.createFunctionExpression = createFunctionExpression;
  exports.createIfStatement = createIfStatement;
  exports.createInterpolation = createInterpolation;
  exports.createObjectExpression = createObjectExpression;
  exports.createObjectProperty = createObjectProperty;
  exports.createReturnStatement = createReturnStatement;
  exports.createRoot = createRoot;
  exports.createSequenceExpression = createSequenceExpression;
  exports.createSimpleExpression = createSimpleExpression;
  exports.createStructuralDirectiveTransform = createStructuralDirectiveTransform;
  exports.createTemplateLiteral = createTemplateLiteral;
  exports.createTransformContext = createTransformContext;
  exports.createVNodeCall = createVNodeCall;
  exports.extractIdentifiers = extractIdentifiers;
  exports.findDir = findDir;
  exports.findProp = findProp;
  exports.generate = generate;
  exports.generateCodeFrame = generateCodeFrame;
  exports.getBaseTransformPreset = getBaseTransformPreset;
  exports.getConstantType = getConstantType;
  exports.getInnerRange = getInnerRange;
  exports.getMemoedVNodeCall = getMemoedVNodeCall;
  exports.getVNodeBlockHelper = getVNodeBlockHelper;
  exports.getVNodeHelper = getVNodeHelper;
  exports.hasDynamicKeyVBind = hasDynamicKeyVBind;
  exports.hasScopeRef = hasScopeRef;
  exports.helperNameMap = helperNameMap;
  exports.injectProp = injectProp;
  exports.isBuiltInType = isBuiltInType;
  exports.isCoreComponent = isCoreComponent;
  exports.isFunctionType = isFunctionType;
  exports.isInDestructureAssignment = isInDestructureAssignment;
  exports.isMemberExpression = isMemberExpression;
  exports.isMemberExpressionBrowser = isMemberExpressionBrowser;
  exports.isMemberExpressionNode = isMemberExpressionNode;
  exports.isReferencedIdentifier = isReferencedIdentifier;
  exports.isSimpleIdentifier = isSimpleIdentifier;
  exports.isSlotOutlet = isSlotOutlet;
  exports.isStaticArgOf = isStaticArgOf;
  exports.isStaticExp = isStaticExp;
  exports.isStaticProperty = isStaticProperty;
  exports.isStaticPropertyKey = isStaticPropertyKey;
  exports.isTemplateNode = isTemplateNode;
  exports.isText = isText$1;
  exports.isVSlot = isVSlot;
  exports.locStub = locStub;
  exports.noopDirectiveTransform = noopDirectiveTransform;
  exports.parse = parse;
  exports.parserOptions = parserOptions;
  exports.processExpression = processExpression;
  exports.processFor = processFor;
  exports.processIf = processIf;
  exports.processSlotOutlet = processSlotOutlet;
  exports.registerRuntimeHelpers = registerRuntimeHelpers;
  exports.resolveComponentType = resolveComponentType;
  exports.stringifyExpression = stringifyExpression;
  exports.toValidAssetId = toValidAssetId;
  exports.trackSlotScopes = trackSlotScopes;
  exports.trackVForSlotScopes = trackVForSlotScopes;
  exports.transform = transform;
  exports.transformBind = transformBind;
  exports.transformElement = transformElement;
  exports.transformExpression = transformExpression;
  exports.transformModel = transformModel$1;
  exports.transformOn = transformOn$1;
  exports.transformStyle = transformStyle;
  exports.traverseNode = traverseNode;
  exports.walkBlockDeclarations = walkBlockDeclarations;
  exports.walkFunctionParams = walkFunctionParams;
  exports.walkIdentifiers = walkIdentifiers;
  exports.warnDeprecation = warnDeprecation;

  return exports;

})({});
