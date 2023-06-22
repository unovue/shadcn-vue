type JSValue = string | number | bigint | boolean | symbol | Function | Array<any> | undefined | object | null;
type JSType = "string" | "number" | "bigint" | "boolean" | "symbol" | "function" | "object" | "any" | "array";
type ResolveFn = (value: any, get: (key: string) => any) => JSValue | Promise<JSValue>;
interface TypeDescriptor {
    /** Used internally to handle schema types */
    type?: JSType | JSType[];
    /** Fully resolved correct TypeScript type for generated TS declarations */
    tsType?: string;
    /** Human-readable type description for use in generated documentation */
    markdownType?: string;
    items?: TypeDescriptor | TypeDescriptor[];
}
interface FunctionArg extends TypeDescriptor {
    name?: string;
    default?: JSValue;
    optional?: boolean;
}
interface Schema extends TypeDescriptor {
    id?: string;
    default?: JSValue;
    resolve?: ResolveFn;
    properties?: {
        [key: string]: Schema;
    };
    required?: string[];
    title?: string;
    description?: string;
    $schema?: string;
    tags?: string[];
    args?: FunctionArg[];
    returns?: TypeDescriptor;
}
interface InputObject {
    $schema?: Schema;
    $resolve?: ResolveFn;
    $default?: any;
    [key: string]: any;
}
type InputValue = InputObject | JSValue;
type SchemaDefinition = {
    [x: string]: JSValue | InputObject | SchemaDefinition;
};

export { FunctionArg as F, InputObject as I, JSValue as J, ResolveFn as R, Schema as S, TypeDescriptor as T, SchemaDefinition as a, JSType as b, InputValue as c };
