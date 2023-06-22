import MagicString from 'magic-string';

declare const builtinPresets: {
    '@vue/composition-api': InlinePreset;
    '@vueuse/core': () => Preset;
    '@vueuse/head': InlinePreset;
    pinia: InlinePreset;
    preact: InlinePreset;
    quasar: InlinePreset;
    react: InlinePreset;
    'react-router': InlinePreset;
    'react-router-dom': InlinePreset;
    svelte: InlinePreset;
    'svelte/animate': InlinePreset;
    'svelte/easing': InlinePreset;
    'svelte/motion': InlinePreset;
    'svelte/store': InlinePreset;
    'svelte/transition': InlinePreset;
    'vee-validate': InlinePreset;
    vitepress: InlinePreset;
    'vue-demi': InlinePreset;
    'vue-i18n': InlinePreset;
    'vue-router': InlinePreset;
    'vue-router-composables': InlinePreset;
    vue: InlinePreset;
    'vue/macros': InlinePreset;
    vuex: InlinePreset;
    vitest: InlinePreset;
    'uni-app': InlinePreset;
    'solid-js': InlinePreset;
    'solid-app-router': InlinePreset;
};
type BuiltinPresetName = keyof typeof builtinPresets;

type ModuleId = string;
type ImportName = string;
interface ImportCommon {
    /** Module specifier to import from */
    from: ModuleId;
    /**
     * Priority of the import, if multiple imports have the same name, the one with the highest priority will be used
     * @default 1
     */
    priority?: number;
    /** If this import is disabled */
    disabled?: boolean;
    /**
     * Metadata of the import
     */
    meta?: {
        /** Short description of the import */
        description?: string;
        /** URL to the documentation */
        docsUrl?: string;
        /** Additional metadata */
        [key: string]: any;
    };
    /**
     * If this import is a type import
     */
    type?: boolean;
}
interface Import extends ImportCommon {
    /** Import name to be detected */
    name: ImportName;
    /** Import as this name */
    as?: ImportName;
}
type PresetImport = Omit<Import, 'from'> | ImportName | [name: ImportName, as?: ImportName, from?: ModuleId];
interface InlinePreset extends ImportCommon {
    imports: (PresetImport | InlinePreset)[];
}
/**
 * Auto extract exports from a package for auto import
 */
interface PackagePreset {
    /**
     * Name of the package
     */
    package: string;
    /**
     * Path of the importer
     * @default process.cwd()
     */
    url?: string;
    /**
     * RegExp, string, or custom function to exclude names of the extracted imports
     */
    ignore?: (string | RegExp | ((name: string) => boolean))[];
    /**
     * Use local cache if exits
     * @default true
     */
    cache?: boolean;
}
type Preset = InlinePreset | PackagePreset;
interface UnimportContext {
    options: Partial<UnimportOptions>;
    staticImports: Import[];
    dynamicImports: Import[];
    addons: Addon[];
    getImports(): Promise<Import[]>;
    getImportMap(): Promise<Map<string, Import>>;
    getMetadata(): UnimportMeta | undefined;
    replaceImports(imports: UnimportOptions['imports']): Promise<Import[]>;
    invalidate(): void;
    resolveId(id: string, parentId?: string): Thenable<string | null | undefined | void>;
}
interface InjectionUsageRecord {
    import: Import;
    count: number;
    moduleIds: string[];
}
interface UnimportMeta {
    injectionUsage: Record<string, InjectionUsageRecord>;
}
interface AddonsOptions {
    /**
     * Enable auto import inside for Vue's <template>
     *
     * @default false
     */
    vueTemplate?: boolean;
}
interface UnimportOptions extends Pick<InjectImportsOptions, 'injectAtEnd' | 'mergeExisting'> {
    /**
     * Auto import items
     */
    imports: Import[];
    /**
     * Auto import preset
     */
    presets: (Preset | BuiltinPresetName)[];
    /**
     * Custom warning function
     * @default console.warn
     */
    warn: (msg: string) => void;
    /**
     * Custom debug log function
     * @default console.log
     */
    debugLog: (msg: string) => void;
    /**
     * Unimport Addons
     * To use built-in addons, use `addons: { vueTemplate: true }`
     *
     * Built-in addons:
     * - vueTemplate: enable auto import inside for Vue's <template>
     *
     * @default {}
     */
    addons: AddonsOptions | Addon[];
    /**
     * Name of virtual modules that exposed all the registed auto-imports
     * @default []
     */
    virtualImports: string[];
    /**
     * Directories to scan for auto import
     * @default []
     */
    dirs?: string[];
    /**
     * Options for scanning directories for auto import
     */
    dirsScanOptions?: ScanDirExportsOptions;
    /**
     * Custom resolver to auto import id
     */
    resolveId?: (id: string, importee?: string) => Thenable<string | void>;
    /**
     * Custom magic comments to be opt-out for auto import, per file/module
     *
     * @default ['@unimport-disable', '@imports-disable']
     */
    commentsDisable?: string[];
    /**
     * Custom magic comments to debug auto import, printed to console
     *
     * @default ['@unimport-debug', '@imports-debug']
     */
    commentsDebug?: string[];
    /**
     * Collect meta data for each auto import. Accessible via `ctx.meta`
     */
    collectMeta?: boolean;
}
type PathFromResolver = (_import: Import) => string | undefined;
interface ScanDirExportsOptions {
    /**
     * Glob patterns for matching files
     *
     * @default ['*.{ts,js,mjs,cjs,mts,cts}']
     */
    filePatterns?: string[];
    /**
     * Custom function to filter scanned files
     */
    fileFilter?: (file: string) => boolean;
    /**
     * Current working directory
     *
     * @default process.cwd()
     */
    cwd?: string;
}
interface TypeDeclarationOptions {
    /**
     * Custom resolver for path of the import
     */
    resolvePath?: PathFromResolver;
    /**
     * Append `export {}` to the end of the file
     *
     * @default true
     */
    exportHelper?: boolean;
    /**
     * Auto-import for type exports
     *
     * @default true
     */
    typeReExports?: boolean;
}
interface InjectImportsOptions {
    /**
     * Merge the existing imports
     *
     * @default false
     */
    mergeExisting?: boolean;
    /**
     * If the module should be auto imported
     *
     * @default true
     */
    autoImport?: boolean;
    /**
     * If the module should be transformed for virtual modules.
     * Only available when `virtualImports` is set.
     *
     * @default true
     */
    transformVirtualImports?: boolean;
    /** @deprecated use `virtualImports` instead */
    transformVirtualImoports?: boolean;
    /**
     * Inject the imports at the end of other imports
     *
     * @default false
     */
    injectAtEnd?: boolean;
}
type Thenable<T> = Promise<T> | T;
interface Addon {
    transform?: (this: UnimportContext, code: MagicString, id: string | undefined) => Thenable<MagicString>;
    declaration?: (this: UnimportContext, dts: string, options: TypeDeclarationOptions) => Thenable<string>;
    matchImports?: (this: UnimportContext, identifiers: Set<string>, matched: Import[]) => Thenable<Import[] | void>;
}
interface InstallGlobalOptions {
    /**
     * @default globalThis
     */
    globalObject?: any;
    /**
     * Overrides the existing property
     * @default false
     */
    overrides?: boolean;
}
interface MagicStringResult {
    s: MagicString;
    code: string;
}
interface ImportInjectionResult extends MagicStringResult {
    imports: Import[];
}

export { AddonsOptions as A, BuiltinPresetName as B, Import as I, MagicStringResult as M, Preset as P, ScanDirExportsOptions as S, TypeDeclarationOptions as T, UnimportOptions as U, InlinePreset as a, Thenable as b, InjectImportsOptions as c, ImportInjectionResult as d, UnimportMeta as e, UnimportContext as f, InstallGlobalOptions as g, builtinPresets as h, ModuleId as i, ImportName as j, ImportCommon as k, PresetImport as l, PackagePreset as m, InjectionUsageRecord as n, PathFromResolver as o, Addon as p };
