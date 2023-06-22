'use strict';

const mlly = require('mlly');
const vueTemplate = require('./unimport.1edcd3b8.cjs');
const fs = require('fs');
const localPkg = require('local-pkg');
const os = require('os');
const pkgTypes = require('pkg-types');
const pathe = require('pathe');
const promises = require('fs/promises');
const fg = require('fast-glob');
const scule = require('scule');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const os__default = /*#__PURE__*/_interopDefaultCompat(os);
const fg__default = /*#__PURE__*/_interopDefaultCompat(fg);

const pinia = vueTemplate.defineUnimportPreset({
  from: "pinia",
  imports: [
    // https://pinia.esm.dev/api/modules/pinia.html#functions
    "acceptHMRUpdate",
    "createPinia",
    "defineStore",
    "getActivePinia",
    "mapActions",
    "mapGetters",
    "mapState",
    "mapStores",
    "mapWritableState",
    "setActivePinia",
    "setMapStoreSuffix",
    "storeToRefs"
  ]
});

const preact = vueTemplate.defineUnimportPreset({
  from: "preact",
  imports: [
    "useState",
    "useCallback",
    "useMemo",
    "useEffect",
    "useRef",
    "useContext",
    "useReducer"
  ]
});

const quasar = vueTemplate.defineUnimportPreset({
  from: "quasar",
  imports: [
    // https://quasar.dev/vue-composables
    "useQuasar",
    "useDialogPluginComponent",
    "useFormChild",
    "useMeta"
  ]
});

const react = vueTemplate.defineUnimportPreset({
  from: "react",
  imports: [
    "useState",
    "useCallback",
    "useMemo",
    "useEffect",
    "useRef",
    "useContext",
    "useReducer"
  ]
});

const ReactRouterHooks = [
  "useOutletContext",
  "useHref",
  "useInRouterContext",
  "useLocation",
  "useNavigationType",
  "useNavigate",
  "useOutlet",
  "useParams",
  "useResolvedPath",
  "useRoutes"
];
const reactRouter = vueTemplate.defineUnimportPreset({
  from: "react-router",
  imports: [
    ...ReactRouterHooks
  ]
});

const reactRouterDom = vueTemplate.defineUnimportPreset({
  from: "react-router-dom",
  imports: [
    ...ReactRouterHooks,
    // react-router-dom only hooks
    "useLinkClickHandler",
    "useSearchParams",
    // react-router-dom Component
    // call once in general
    // 'BrowserRouter',
    // 'HashRouter',
    // 'MemoryRouter',
    "Link",
    "NavLink",
    "Navigate",
    "Outlet",
    "Route",
    "Routes"
  ]
});

const svelteAnimate = vueTemplate.defineUnimportPreset({
  from: "svelte/animate",
  imports: [
    "flip"
  ]
});
const svelteEasing = vueTemplate.defineUnimportPreset({
  from: "svelte/easing",
  imports: [
    "back",
    "bounce",
    "circ",
    "cubic",
    "elastic",
    "expo",
    "quad",
    "quart",
    "quint",
    "sine"
  ].reduce((acc, e) => {
    acc.push(`${e}In`, `${e}Out`, `${e}InOut`);
    return acc;
  }, ["linear"])
});
const svelteStore = vueTemplate.defineUnimportPreset({
  from: "svelte/store",
  imports: [
    "writable",
    "readable",
    "derived",
    "get"
  ]
});
const svelteMotion = vueTemplate.defineUnimportPreset({
  from: "svelte/motion",
  imports: [
    "tweened",
    "spring"
  ]
});
const svelteTransition = vueTemplate.defineUnimportPreset({
  from: "svelte/transition",
  imports: [
    "fade",
    "blur",
    "fly",
    "slide",
    "scale",
    "draw",
    "crossfade"
  ]
});
const svelte = vueTemplate.defineUnimportPreset({
  from: "svelte",
  imports: [
    // lifecycle
    "onMount",
    "beforeUpdate",
    "afterUpdate",
    "onDestroy",
    // tick
    "tick",
    // context
    "setContext",
    "getContext",
    "hasContext",
    "getAllContexts",
    // event dispatcher
    "createEventDispatcher"
  ]
});

const veeValidate = vueTemplate.defineUnimportPreset({
  from: "vee-validate",
  imports: [
    // https://vee-validate.logaretm.com/v4/guide/composition-api/api-review
    // https://github.com/logaretm/vee-validate/blob/main/packages/vee-validate/src/index.ts
    "validate",
    "defineRule",
    "configure",
    "useField",
    "useForm",
    "useFieldArray",
    "useResetForm",
    "useIsFieldDirty",
    "useIsFieldTouched",
    "useIsFieldValid",
    "useIsSubmitting",
    "useValidateField",
    "useIsFormDirty",
    "useIsFormTouched",
    "useIsFormValid",
    "useValidateForm",
    "useSubmitCount",
    "useFieldValue",
    "useFormValues",
    "useFormErrors",
    "useFieldError",
    "useSubmitForm",
    "FormContextKey",
    "FieldContextKey"
  ]
});

const vitepress = vueTemplate.defineUnimportPreset({
  from: "vitepress",
  imports: [
    // helper methods
    "useData",
    "useRoute",
    "useRouter",
    "withBase"
  ]
});

const CommonCompositionAPI = [
  // lifecycle
  "onActivated",
  "onBeforeMount",
  "onBeforeUnmount",
  "onBeforeUpdate",
  "onErrorCaptured",
  "onDeactivated",
  "onMounted",
  "onServerPrefetch",
  "onUnmounted",
  "onUpdated",
  // setup helpers
  "useAttrs",
  "useSlots",
  // reactivity,
  "computed",
  "customRef",
  "isReadonly",
  "isRef",
  "isProxy",
  "isReactive",
  "markRaw",
  "reactive",
  "readonly",
  "ref",
  "shallowReactive",
  "shallowReadonly",
  "shallowRef",
  "triggerRef",
  "toRaw",
  "toRef",
  "toRefs",
  "toValue",
  "unref",
  "watch",
  "watchEffect",
  "watchPostEffect",
  "watchSyncEffect",
  // component
  "defineComponent",
  "defineAsyncComponent",
  "getCurrentInstance",
  "h",
  "inject",
  "nextTick",
  "provide",
  "useCssModule",
  "createApp",
  // effect scope
  "effectScope",
  "EffectScope",
  "getCurrentScope",
  "onScopeDispose",
  // types
  ...[
    "Component",
    "ComponentPublicInstance",
    "ComputedRef",
    "InjectionKey",
    "PropType",
    "Ref",
    "VNode"
  ].map((name) => ({ name, type: true }))
];
const vue = vueTemplate.defineUnimportPreset({
  from: "vue",
  imports: [
    ...CommonCompositionAPI,
    // vue3 only
    "onRenderTracked",
    "onRenderTriggered",
    "resolveComponent",
    "useCssVars"
  ]
});

const vueMacros = vueTemplate.defineUnimportPreset({
  from: "vue/macros",
  imports: [
    // https://vuejs.org/guide/extras/reactivity-transform.html#refs-vs-reactive-variables
    "$",
    "$$",
    "$ref",
    "$shallowRef",
    "$toRef",
    "$customRef",
    "$computed"
  ]
});

const vueDemi = vueTemplate.defineUnimportPreset({
  from: "vue-demi",
  imports: CommonCompositionAPI
});

const vueI18n = vueTemplate.defineUnimportPreset({
  from: "vue-i18n",
  imports: [
    "useI18n"
  ]
});

const vueRouter = vueTemplate.defineUnimportPreset({
  from: "vue-router",
  imports: [
    "useRouter",
    "useRoute",
    "useLink",
    "onBeforeRouteLeave",
    "onBeforeRouteUpdate"
  ]
});

const vueCompositionApi = vueTemplate.defineUnimportPreset({
  from: "@vue/composition-api",
  imports: CommonCompositionAPI
});

let _cache;
const vueuseCore = () => {
  const excluded = ["toRefs", "utils"];
  if (!_cache) {
    try {
      const corePath = localPkg.resolveModule("@vueuse/core") || process.cwd();
      const path = localPkg.resolveModule("@vueuse/core/indexes.json") || localPkg.resolveModule("@vueuse/metadata/index.json") || localPkg.resolveModule("@vueuse/metadata/index.json", { paths: [corePath] });
      const indexesJson = JSON.parse(fs.readFileSync(path, "utf-8"));
      _cache = vueTemplate.defineUnimportPreset({
        from: "@vueuse/core",
        imports: indexesJson.functions.filter((i) => ["core", "shared"].includes(i.package)).map((i) => i.name).filter((i) => i && i.length >= 4 && !excluded.includes(i))
      });
    } catch (error) {
      console.error(error);
      throw new Error("[auto-import] failed to load @vueuse/core, have you installed it?");
    }
  }
  return _cache;
};

const vueuseHead = vueTemplate.defineUnimportPreset({
  from: "@vueuse/head",
  imports: [
    "useHead"
  ]
});

const vuex = vueTemplate.defineUnimportPreset({
  from: "vuex",
  imports: [
    // https://next.vuex.vuejs.org/api/#createstore
    "createStore",
    // https://github.com/vuejs/vuex/blob/4.0/types/logger.d.ts#L20
    "createLogger",
    // https://next.vuex.vuejs.org/api/#component-binding-helpers
    "mapState",
    "mapGetters",
    "mapActions",
    "mapMutations",
    "createNamespacedHelpers",
    // https://next.vuex.vuejs.org/api/#composable-functions
    "useStore"
  ]
});

const vitest = vueTemplate.defineUnimportPreset({
  from: "vitest",
  imports: [
    // suite
    "suite",
    "test",
    "describe",
    "it",
    // chai
    "chai",
    "expect",
    "assert",
    // utils
    "vitest",
    "vi",
    // hooks
    "beforeAll",
    "afterAll",
    "beforeEach",
    "afterEach"
  ]
});

const uniApp = vueTemplate.defineUnimportPreset({
  from: "@dcloudio/uni-app",
  imports: [
    "onAddToFavorites",
    "onBackPress",
    "onError",
    "onHide",
    "onLaunch",
    "onLoad",
    "onNavigationBarButtonTap",
    "onNavigationBarSearchInputChanged",
    "onNavigationBarSearchInputClicked",
    "onNavigationBarSearchInputConfirmed",
    "onNavigationBarSearchInputFocusChanged",
    "onPageNotFound",
    "onPageScroll",
    "onPullDownRefresh",
    "onReachBottom",
    "onReady",
    "onResize",
    "onShareAppMessage",
    "onShareTimeline",
    "onShow",
    "onTabItemTap",
    "onThemeChange",
    "onUnhandledRejection",
    "onUnload"
  ]
});

const solidCore = vueTemplate.defineUnimportPreset({
  from: "solid-js",
  imports: [
    "createSignal",
    "createEffect",
    "createMemo",
    "createResource",
    "onMount",
    "onCleanup",
    "onError",
    "untrack",
    "batch",
    "on",
    "createRoot",
    "mergeProps",
    "splitProps",
    "useTransition",
    "observable",
    "mapArray",
    "indexArray",
    "createContext",
    "useContext",
    "children",
    "lazy",
    "createDeferred",
    "createRenderEffect",
    "createSelector",
    "For",
    "Show",
    "Switch",
    "Match",
    "Index",
    "ErrorBoundary",
    "Suspense",
    "SuspenseList"
  ]
});
const solidStore = vueTemplate.defineUnimportPreset({
  from: "solid-js/store",
  imports: [
    "createStore",
    "produce",
    "reconcile",
    "createMutable"
  ]
});
const solidWeb = vueTemplate.defineUnimportPreset({
  from: "solid-js/web",
  imports: [
    "Dynamic",
    "hydrate",
    "render",
    "renderToString",
    "renderToStringAsync",
    "renderToStream",
    "isServer",
    "Portal"
  ]
});
const solid = vueTemplate.defineUnimportPreset({
  from: "solid-js",
  imports: [
    solidCore,
    solidStore,
    solidWeb
  ]
});

const solidAppRouter = vueTemplate.defineUnimportPreset({
  from: "solid-app-router",
  imports: [
    "Link",
    "NavLink",
    "Navigate",
    "Outlet",
    "Route",
    "Router",
    "Routes",
    "_mergeSearchString",
    "createIntegration",
    "hashIntegration",
    "normalizeIntegration",
    "pathIntegration",
    "staticIntegration",
    "useHref",
    "useIsRouting",
    "useLocation",
    "useMatch",
    "useNavigate",
    "useParams",
    "useResolvedPath",
    "useRouteData",
    "useRoutes",
    "useSearchParams"
  ]
});

const vueRouterComposables = vueTemplate.defineUnimportPreset({
  from: "vue-router/composables",
  imports: [
    "useRouter",
    "useRoute",
    "useLink",
    "onBeforeRouteLeave",
    "onBeforeRouteUpdate"
  ]
});

const builtinPresets = {
  "@vue/composition-api": vueCompositionApi,
  "@vueuse/core": vueuseCore,
  "@vueuse/head": vueuseHead,
  pinia,
  preact,
  quasar,
  react,
  "react-router": reactRouter,
  "react-router-dom": reactRouterDom,
  svelte,
  "svelte/animate": svelteAnimate,
  "svelte/easing": svelteEasing,
  "svelte/motion": svelteMotion,
  "svelte/store": svelteStore,
  "svelte/transition": svelteTransition,
  "vee-validate": veeValidate,
  vitepress,
  "vue-demi": vueDemi,
  "vue-i18n": vueI18n,
  "vue-router": vueRouter,
  "vue-router-composables": vueRouterComposables,
  vue,
  "vue/macros": vueMacros,
  vuex,
  vitest,
  "uni-app": uniApp,
  "solid-js": solid,
  "solid-app-router": solidAppRouter
};

const CACHE_PATH = /* @__PURE__ */ pathe.join(os__default.tmpdir(), "unimport");
let CACHE_WRITEABLE;
async function resolvePackagePreset(preset) {
  const scanned = await extractExports(preset.package, preset.url, preset.cache);
  const filtered = scanned.filter((name) => {
    for (const item of preset.ignore || []) {
      if (typeof item === "string" && item === name) {
        return false;
      }
      if (item instanceof RegExp && item.test(name)) {
        return false;
      }
      if (typeof item === "function" && item(name) === false) {
        return false;
      }
    }
    return true;
  });
  return filtered.map((name) => ({
    from: preset.package,
    name
  }));
}
async function extractExports(name, url, cache = true) {
  const packageJsonPath = await pkgTypes.resolvePackageJSON(name, { url });
  const packageJson = await pkgTypes.readPackageJSON(packageJsonPath);
  const version = packageJson.version;
  const cachePath = pathe.join(CACHE_PATH, name + "@" + version, "exports.json");
  if (cache && CACHE_WRITEABLE === void 0) {
    try {
      CACHE_WRITEABLE = isWritable(CACHE_PATH);
    } catch {
      CACHE_WRITEABLE = false;
    }
  }
  const useCache = cache && version && CACHE_WRITEABLE;
  if (useCache && fs.existsSync(cachePath)) {
    return JSON.parse(await fs.promises.readFile(cachePath, "utf-8"));
  }
  const scanned = await mlly.resolveModuleExportNames(name, { url });
  if (useCache) {
    await fs.promises.mkdir(pathe.dirname(cachePath), { recursive: true });
    await fs.promises.writeFile(cachePath, JSON.stringify(scanned), "utf-8");
  }
  return scanned;
}
function isWritable(filename) {
  try {
    fs.accessSync(filename, fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
}

const commonProps = ["from", "priority", "disabled", "meta", "type"];
async function resolvePreset(preset) {
  const imports = [];
  if ("package" in preset) {
    return await resolvePackagePreset(preset);
  }
  const common = {};
  commonProps.forEach((i) => {
    if (i in preset) {
      common[i] = preset[i];
    }
  });
  for (const _import of preset.imports) {
    if (typeof _import === "string") {
      imports.push({ ...common, name: _import, as: _import });
    } else if (Array.isArray(_import)) {
      imports.push({ ...common, name: _import[0], as: _import[1] || _import[0], from: _import[2] || preset.from });
    } else if (_import.imports) {
      imports.push(...await resolvePreset(_import));
    } else {
      imports.push({ ...common, ..._import });
    }
  }
  return imports;
}
async function resolveBuiltinPresets(presets) {
  const resolved = await Promise.all(presets.map(async (p) => {
    let preset = typeof p === "string" ? builtinPresets[p] : p;
    if (typeof preset === "function") {
      preset = preset();
    }
    return await resolvePreset(preset);
  }));
  return resolved.flat();
}

async function scanFilesFromDir(dir, options) {
  const dirs = (Array.isArray(dir) ? dir : [dir]).map((d) => pathe.normalize(d));
  const fileFilter = options?.fileFilter || (() => true);
  const filePatterns = options?.filePatterns || ["*.{ts,js,mjs,cjs,mts,cts}"];
  const result = await Promise.all(
    // Do multiple glob searches to persist the order of input dirs
    dirs.map(
      async (i) => await fg__default(
        [i, ...filePatterns.map((p) => pathe.join(i, p))],
        {
          absolute: true,
          cwd: options?.cwd || process.cwd(),
          onlyFiles: true,
          followSymbolicLinks: true
        }
      ).then(
        (r) => r.map((f) => pathe.normalize(f)).sort()
      )
    )
  );
  return Array.from(new Set(result.flat())).filter(fileFilter);
}
async function scanDirExports(dir, options) {
  const files = await scanFilesFromDir(dir, options);
  const fileExports = await Promise.all(files.map((i) => scanExports(i)));
  return fileExports.flat();
}
const FileExtensionLookup = [
  ".mts",
  ".cts",
  ".ts",
  ".mjs",
  ".cjs",
  ".js"
];
async function scanExports(filepath, seen = /* @__PURE__ */ new Set()) {
  if (seen.has(filepath)) {
    console.warn(`[unimport] "${filepath}" is already scanned, skipping`);
    return [];
  }
  seen.add(filepath);
  const imports = [];
  const code = await promises.readFile(filepath, "utf-8");
  const exports = mlly.findExports(code);
  const defaultExport = exports.find((i) => i.type === "default");
  if (defaultExport) {
    let name = pathe.parse(filepath).name;
    if (name === "index") {
      name = pathe.parse(filepath.split("/").slice(0, -1).join("/")).name;
    }
    const as = /[-_.]/.test(name) ? scule.camelCase(name) : name;
    imports.push({ name: "default", as, from: filepath });
  }
  for (const exp of exports) {
    if (exp.type === "named") {
      for (const name of exp.names) {
        imports.push({ name, as: name, from: filepath });
      }
    } else if (exp.type === "declaration") {
      if (exp.name) {
        imports.push({ name: exp.name, as: exp.name, from: filepath });
      }
    } else if (exp.type === "star" && exp.specifier) {
      if (exp.name) {
        imports.push({ name: exp.name, as: exp.name, from: filepath });
      } else {
        const subfile = exp.specifier;
        let subfilepath = pathe.resolve(pathe.dirname(filepath), subfile);
        if (!pathe.extname(subfilepath)) {
          for (const ext of FileExtensionLookup) {
            if (fs.existsSync(`${subfilepath}${ext}`)) {
              subfilepath = `${subfilepath}${ext}`;
              break;
            } else if (fs.existsSync(`${subfilepath}/index${ext}`)) {
              subfilepath = `${subfilepath}/index${ext}`;
              break;
            }
          }
        }
        if (!fs.existsSync(subfilepath)) {
          console.warn(`[unimport] failed to resolve "${subfilepath}", skip scanning`);
          continue;
        }
        imports.push(...await scanExports(subfilepath, seen));
      }
    }
  }
  return imports;
}

function createUnimport(opts) {
  let _combinedImports;
  const _map = /* @__PURE__ */ new Map();
  const addons = [];
  if (Array.isArray(opts.addons)) {
    addons.push(...opts.addons);
  } else if (opts.addons?.vueTemplate) {
    addons.push(vueTemplate.vueTemplateAddon());
  }
  opts.addons = addons;
  opts.commentsDisable = opts.commentsDisable ?? ["@unimport-disable", "@imports-disable"];
  opts.commentsDebug = opts.commentsDebug ?? ["@unimport-debug", "@imports-debug"];
  let metadata;
  if (opts.collectMeta) {
    metadata = {
      injectionUsage: {}
    };
  }
  const ctx = {
    options: opts,
    addons,
    staticImports: [...opts.imports || []].filter(Boolean),
    dynamicImports: [],
    async getImports() {
      await resolvePromise;
      return updateImports();
    },
    async replaceImports(imports) {
      ctx.staticImports = [...imports || []].filter(Boolean);
      ctx.invalidate();
      await resolvePromise;
      return updateImports();
    },
    async getImportMap() {
      await ctx.getImports();
      return _map;
    },
    getMetadata() {
      return metadata;
    },
    invalidate() {
      _combinedImports = void 0;
    },
    resolveId: (id, parentId) => opts.resolveId?.(id, parentId)
  };
  const resolvePromise = resolveBuiltinPresets(opts.presets || []).then((r) => {
    ctx.staticImports.unshift(...r);
    _combinedImports = void 0;
    updateImports();
  });
  function updateImports() {
    if (!_combinedImports) {
      const imports = vueTemplate.normalizeImports(vueTemplate.dedupeImports([...ctx.staticImports, ...ctx.dynamicImports], opts.warn || console.warn)).filter((i) => !i.disabled);
      _map.clear();
      for (const _import of imports) {
        if (!_import.type) {
          _map.set(_import.as ?? _import.name, _import);
        }
      }
      _combinedImports = imports;
    }
    return _combinedImports;
  }
  async function modifyDynamicImports(fn) {
    const result = await fn(ctx.dynamicImports);
    if (Array.isArray(result)) {
      ctx.dynamicImports = result;
    }
    ctx.invalidate();
  }
  function clearDynamicImports() {
    ctx.dynamicImports.length = 0;
    ctx.invalidate();
  }
  async function generateTypeDeclarations(options) {
    const opts2 = {
      resolvePath: (i) => i.from,
      ...options
    };
    const {
      typeReExports = true
    } = opts2;
    const imports = await ctx.getImports();
    let dts = vueTemplate.toTypeDeclarationFile(imports.filter((i) => !i.type), opts2);
    const typeOnly = imports.filter((i) => i.type);
    if (typeReExports && typeOnly.length) {
      dts += "\n" + vueTemplate.toTypeReExports(typeOnly, opts2);
    }
    for (const addon of ctx.addons) {
      dts = await addon.declaration?.call(ctx, dts, opts2) ?? dts;
    }
    return dts;
  }
  async function scanImportsFromFile(filepath) {
    const additions = await scanExports(filepath);
    await modifyDynamicImports((imports) => imports.filter((i) => i.from !== filepath).concat(additions));
    return additions;
  }
  async function scanImportsFromDir(dirs = ctx.options.dirs || [], options = ctx.options.dirsScanOptions) {
    const files = await scanFilesFromDir(dirs, options);
    return (await Promise.all(files.map(scanImportsFromFile))).flat();
  }
  async function injectImportsWithContext(code, id, options) {
    const result = await injectImports(code, id, ctx, {
      ...opts,
      ...options
    });
    if (metadata) {
      result.imports.forEach((i) => {
        metadata.injectionUsage[i.name] = metadata.injectionUsage[i.name] || { import: i, count: 0, moduleIds: [] };
        metadata.injectionUsage[i.name].count++;
        if (id && !metadata.injectionUsage[i.name].moduleIds.includes(id)) {
          metadata.injectionUsage[i.name].moduleIds.push(id);
        }
      });
    }
    return result;
  }
  async function init() {
    if (ctx.options.dirs?.length) {
      await scanImportsFromDir();
    }
  }
  return {
    init,
    clearDynamicImports,
    modifyDynamicImports,
    scanImportsFromDir,
    scanImportsFromFile,
    getImports: () => ctx.getImports(),
    getImportMap: () => ctx.getImportMap(),
    detectImports: (code) => detectImports(code, ctx),
    injectImports: injectImportsWithContext,
    toExports: async (filepath) => vueTemplate.toExports(await ctx.getImports(), filepath),
    parseVirtualImports: (code) => parseVirtualImports(code, ctx),
    generateTypeDeclarations: (options) => generateTypeDeclarations(options),
    getMetadata: () => ctx.getMetadata(),
    getInternalContext: () => ctx
  };
}
function parseVirtualImports(code, ctx) {
  if (ctx.options.virtualImports?.length) {
    return mlly.findStaticImports(code).filter((i) => ctx.options.virtualImports.includes(i.specifier)).map((i) => mlly.parseStaticImport(i));
  }
  return [];
}
async function detectImports(code, ctx, options) {
  const s = vueTemplate.getMagicString(code);
  const original = s.original;
  const strippedCode = vueTemplate.stripCommentsAndStrings(original);
  const syntax = mlly.detectSyntax(strippedCode);
  const isCJSContext = syntax.hasCJS && !syntax.hasESM;
  let matchedImports = [];
  const occurrenceMap = /* @__PURE__ */ new Map();
  const map = await ctx.getImportMap();
  if (options?.autoImport !== false) {
    Array.from(strippedCode.matchAll(vueTemplate.matchRE)).forEach((i) => {
      if (i[1] === ".") {
        return null;
      }
      const end = strippedCode[i.index + i[0].length];
      if (end === ":" && !["?", "case"].includes(i[1].trim())) {
        return null;
      }
      const name = i[2];
      const occurrence = i.index + i[1].length;
      if (occurrenceMap.get(name) || Infinity > occurrence) {
        occurrenceMap.set(name, occurrence);
      }
    });
    for (const regex of vueTemplate.excludeRE) {
      for (const match of strippedCode.matchAll(regex)) {
        const segments = [...match[1]?.split(vueTemplate.separatorRE) || [], ...match[2]?.split(vueTemplate.separatorRE) || []];
        for (const segment of segments) {
          const identifier = segment.replace(vueTemplate.importAsRE, "").trim();
          occurrenceMap.delete(identifier);
        }
      }
    }
    const identifiers = new Set(occurrenceMap.keys());
    matchedImports = Array.from(identifiers).map((name) => {
      const item = map.get(name);
      if (item && !item.disabled) {
        return item;
      }
      occurrenceMap.delete(name);
      return null;
    }).filter(Boolean);
    for (const addon of ctx.addons) {
      matchedImports = await addon.matchImports?.call(ctx, identifiers, matchedImports) || matchedImports;
    }
  }
  if (options?.transformVirtualImports !== false && options?.transformVirtualImoports !== false && ctx.options.virtualImports?.length) {
    const virtualImports = parseVirtualImports(original, ctx);
    virtualImports.forEach((i) => {
      s.remove(i.start, i.end);
      Object.entries(i.namedImports || {}).forEach(([name, as]) => {
        const original2 = map.get(name);
        if (!original2) {
          throw new Error(`[unimport] failed to find "${name}" imported from "${i.specifier}"`);
        }
        matchedImports.push({
          from: original2.from,
          name: original2.name,
          as
        });
      });
    });
  }
  const firstOccurrence = Math.min(...Array.from(occurrenceMap.entries()).map((i) => i[1]));
  return {
    s,
    strippedCode,
    isCJSContext,
    matchedImports,
    firstOccurrence
  };
}
async function injectImports(code, id, ctx, options) {
  const s = vueTemplate.getMagicString(code);
  if (ctx.options.commentsDisable?.some((c) => s.original.includes(c))) {
    return {
      s,
      get code() {
        return s.toString();
      },
      imports: []
    };
  }
  for (const addon of ctx.addons) {
    await addon.transform?.call(ctx, s, id);
  }
  const { isCJSContext, matchedImports, firstOccurrence } = await detectImports(s, ctx, options);
  const imports = await resolveImports(ctx, matchedImports, id);
  if (ctx.options.commentsDebug?.some((c) => s.original.includes(c))) {
    const log = ctx.options.debugLog || console.log;
    log(`[unimport] ${imports.length} imports detected in "${id}"${imports.length ? ": " + imports.map((i) => i.name).join(", ") : ""}`);
  }
  return {
    ...vueTemplate.addImportToCode(s, imports, isCJSContext, options?.mergeExisting, options?.injectAtEnd, firstOccurrence),
    imports
  };
}
async function resolveImports(ctx, imports, id) {
  const resolveCache = /* @__PURE__ */ new Map();
  const _imports = await Promise.all(imports.map(async (i) => {
    if (!resolveCache.has(i.from)) {
      resolveCache.set(i.from, await ctx.resolveId(i.from, id) || i.from);
    }
    const from = resolveCache.get(i.from);
    if (i.from === id || !from || from === "." || from === id) {
      return;
    }
    return {
      ...i,
      from
    };
  }));
  return _imports.filter(Boolean);
}

exports.builtinPresets = builtinPresets;
exports.createUnimport = createUnimport;
exports.resolveBuiltinPresets = resolveBuiltinPresets;
exports.resolvePreset = resolvePreset;
exports.scanDirExports = scanDirExports;
exports.scanExports = scanExports;
exports.scanFilesFromDir = scanFilesFromDir;
