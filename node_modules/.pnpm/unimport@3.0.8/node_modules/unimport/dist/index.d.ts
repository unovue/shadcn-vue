import { P as Preset, I as Import, B as BuiltinPresetName, a as InlinePreset, T as TypeDeclarationOptions, M as MagicStringResult, S as ScanDirExportsOptions, U as UnimportOptions, b as Thenable, c as InjectImportsOptions, d as ImportInjectionResult, e as UnimportMeta, f as UnimportContext, g as InstallGlobalOptions } from './types-2cb9c8f5.js';
export { p as Addon, A as AddonsOptions, k as ImportCommon, j as ImportName, n as InjectionUsageRecord, i as ModuleId, m as PackagePreset, o as PathFromResolver, l as PresetImport, h as builtinPresets } from './types-2cb9c8f5.js';
import MagicString from 'magic-string';
import * as mlly from 'mlly';

declare function resolvePreset(preset: Preset): Promise<Import[]>;
declare function resolveBuiltinPresets(presets: (BuiltinPresetName | Preset)[]): Promise<Import[]>;

declare const excludeRE: RegExp[];
declare const importAsRE: RegExp;
declare const separatorRE: RegExp;
/**                                                           |       |
 *                    destructing   case&ternary    non-call  |  id   |
 *                         ↓             ↓             ↓      |       |*/
declare const matchRE: RegExp;
declare function stripCommentsAndStrings(code: string): string;
declare function defineUnimportPreset(preset: InlinePreset): InlinePreset;
declare function toImports(imports: Import[], isCJS?: boolean): string;
declare function dedupeImports(imports: Import[], warn: (msg: string) => void): Import[];
declare function toExports(imports: Import[], fileDir?: string): string;
declare function toTypeDeclarationItems(imports: Import[], options?: TypeDeclarationOptions): string[];
declare function toTypeDeclarationFile(imports: Import[], options?: TypeDeclarationOptions): string;
declare function toTypeReExports(imports: Import[], options?: TypeDeclarationOptions): string;
declare function getString(code: string | MagicString): string;
declare function getMagicString(code: string | MagicString): MagicString;
declare function addImportToCode(code: string | MagicString, imports: Import[], isCJS?: boolean, mergeExisting?: boolean, injectAtLast?: boolean, firstOccurrence?: number): MagicStringResult;
declare function normalizeImports(imports: Import[]): Import[];
declare function resolveIdAbsolute(id: string, parentId?: string): Promise<any>;

declare function scanFilesFromDir(dir: string | string[], options?: ScanDirExportsOptions): Promise<string[]>;
declare function scanDirExports(dir: string | string[], options?: ScanDirExportsOptions): Promise<Import[]>;
declare function scanExports(filepath: string, seen?: Set<string>): Promise<Import[]>;

type Unimport = ReturnType<typeof createUnimport>;
declare function createUnimport(opts: Partial<UnimportOptions>): {
    init: () => Promise<void>;
    clearDynamicImports: () => void;
    modifyDynamicImports: (fn: (imports: Import[]) => Thenable<void | Import[]>) => Promise<void>;
    scanImportsFromDir: (dirs?: string[], options?: ScanDirExportsOptions | undefined) => Promise<Import[]>;
    scanImportsFromFile: (filepath: string) => Promise<Import[]>;
    getImports: () => Promise<Import[]>;
    getImportMap: () => Promise<Map<string, Import>>;
    detectImports: (code: string | MagicString) => Promise<{
        s: MagicString;
        strippedCode: string;
        isCJSContext: boolean;
        matchedImports: Import[];
        firstOccurrence: number;
    }>;
    injectImports: (code: string | MagicString, id?: string, options?: InjectImportsOptions) => Promise<ImportInjectionResult>;
    toExports: (filepath?: string) => Promise<string>;
    parseVirtualImports: (code: string) => mlly.ParsedStaticImport[];
    generateTypeDeclarations: (options?: TypeDeclarationOptions) => Promise<string>;
    getMetadata: () => UnimportMeta | undefined;
    getInternalContext: () => UnimportContext;
};

declare function installGlobalAutoImports(imports: Import[] | Unimport, options?: InstallGlobalOptions): Promise<any>;

export { BuiltinPresetName, Import, ImportInjectionResult, InjectImportsOptions, InlinePreset, InstallGlobalOptions, MagicStringResult, Preset, ScanDirExportsOptions, Thenable, TypeDeclarationOptions, Unimport, UnimportContext, UnimportMeta, UnimportOptions, addImportToCode, createUnimport, dedupeImports, defineUnimportPreset, excludeRE, getMagicString, getString, importAsRE, installGlobalAutoImports, matchRE, normalizeImports, resolveBuiltinPresets, resolveIdAbsolute, resolvePreset, scanDirExports, scanExports, scanFilesFromDir, separatorRE, stripCommentsAndStrings, toExports, toImports, toTypeDeclarationFile, toTypeDeclarationItems, toTypeReExports };
