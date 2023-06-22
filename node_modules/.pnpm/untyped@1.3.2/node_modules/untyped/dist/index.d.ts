import { I as InputObject, S as Schema, a as SchemaDefinition } from './types-a20127ea.js';
export { F as FunctionArg, c as InputValue, b as JSType, J as JSValue, R as ResolveFn, T as TypeDescriptor } from './types-a20127ea.js';

declare function resolveSchema(obj: InputObject, defaults?: InputObject): Promise<Schema>;
declare function applyDefaults(ref: InputObject, input: InputObject): Promise<InputObject>;

interface GenerateTypesOptions {
    interfaceName?: string;
    addExport?: boolean;
    addDefaults?: boolean;
    defaultDescription?: string;
    indentation?: number;
    allowExtraKeys?: boolean;
    partial?: boolean;
}
declare function generateTypes(schema: Schema, opts?: GenerateTypesOptions): string;

declare function generateMarkdown(schema: Schema): string;

declare function defineUntypedSchema(options: SchemaDefinition): SchemaDefinition;

export { InputObject, Schema, SchemaDefinition, applyDefaults, defineUntypedSchema, generateMarkdown, generateTypes, resolveSchema };
