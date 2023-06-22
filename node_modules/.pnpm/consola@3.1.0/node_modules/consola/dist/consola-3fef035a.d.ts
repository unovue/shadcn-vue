type SelectOption = {
    label: string;
    value: string;
    hint?: string;
};
type TextOptions = {
    type?: "text";
    default?: string;
    placeholder?: string;
    initial?: string;
};
type ConfirmOptions = {
    type: "confirm";
    initial?: boolean;
};
type SelectOptions = {
    type: "select";
    initial?: string;
    options: (SelectOption | string)[];
};
type MultiSelectOptions = {
    type: "multiselect";
    initial?: string;
    options: string[] | SelectOption[];
    required?: boolean;
};
type PromptOptions = TextOptions | ConfirmOptions | SelectOptions | MultiSelectOptions;
type inferPromptReturnType<T extends PromptOptions> = T extends TextOptions ? string : T extends ConfirmOptions ? boolean : string[];
declare function prompt<_ = any, __ = any, T extends PromptOptions = TextOptions>(message: string, opts?: PromptOptions): Promise<inferPromptReturnType<T>>;

type LogLevel = 0 | 1 | 2 | 3 | 4 | 5 | (number & {});
declare const LogLevels: Record<LogType, number>;
type LogType = "silent" | "fatal" | "error" | "warn" | "log" | "info" | "success" | "fail" | "ready" | "start" | "debug" | "trace" | "verbose";
declare const LogTypes: Record<LogType, Partial<LogObject>>;

interface ConsolaOptions {
    reporters: ConsolaReporter[];
    types: Record<LogType, InputLogObject>;
    level: LogLevel;
    defaults: InputLogObject;
    throttle: number;
    throttleMin: number;
    stdout?: NodeJS.WriteStream;
    stderr?: NodeJS.WriteStream;
    mockFn?: (type: LogType, defaults: InputLogObject) => (...args: any) => void;
    prompt?: typeof prompt | undefined;
    formatOptions: FormatOptions;
}
/**
 * @see https://nodejs.org/api/util.html#util_util_inspect_object_showhidden_depth_colors
 */
interface FormatOptions {
    columns?: number;
    date?: boolean;
    colors?: boolean;
    compact?: boolean | number;
    [key: string]: any;
}
interface InputLogObject {
    level?: LogLevel;
    tag?: string;
    type?: LogType;
    message?: string;
    additional?: string | string[];
    args?: any[];
    date?: Date;
}
interface LogObject extends InputLogObject {
    level: LogLevel;
    type: LogType;
    tag: string;
    args: any[];
    date: Date;
}
interface ConsolaReporter {
    log: (logObj: LogObject, ctx: {
        options: ConsolaOptions;
    }) => void;
}

declare class Consola {
    options: ConsolaOptions;
    _lastLog: {
        serialized?: string;
        object?: LogObject;
        count?: number;
        time?: Date;
        timeout?: ReturnType<typeof setTimeout>;
    };
    constructor(options?: Partial<ConsolaOptions>);
    get level(): LogLevel;
    set level(level: LogLevel);
    prompt<T extends PromptOptions>(message: string, opts?: T): Promise<T extends TextOptions ? string : T extends ConfirmOptions ? boolean : string[]>;
    create(options: Partial<ConsolaOptions>): ConsolaInstance;
    withDefaults(defaults: InputLogObject): ConsolaInstance;
    withTag(tag: string): ConsolaInstance;
    addReporter(reporter: ConsolaReporter): this;
    removeReporter(reporter: ConsolaReporter): this | ConsolaReporter[];
    setReporters(reporters: ConsolaReporter[]): this;
    wrapAll(): void;
    restoreAll(): void;
    wrapConsole(): void;
    restoreConsole(): void;
    wrapStd(): void;
    _wrapStream(stream: NodeJS.WriteStream | undefined, type: LogType): void;
    restoreStd(): void;
    _restoreStream(stream?: NodeJS.WriteStream): void;
    pauseLogs(): void;
    resumeLogs(): void;
    mockTypes(mockFn?: (type: string, currentType: any) => any): void;
    _wrapLogFn(defaults: InputLogObject, isRaw?: boolean): (...args: any[]) => false | undefined;
    _logFn(defaults: InputLogObject, args: any[], isRaw?: boolean): false | undefined;
    _log(logObj: LogObject): void;
}
interface LogFn {
    (message: InputLogObject | any, ...args: any[]): void;
    raw: (...args: any[]) => void;
}
type ConsolaInstance = Consola & Record<LogType, LogFn>;
declare function createConsola(options?: Partial<ConsolaOptions>): ConsolaInstance;

export { ConsolaOptions as C, FormatOptions as F, InputLogObject as I, LogLevels as L, ConsolaInstance as a, LogTypes as b, Consola as c, LogLevel as d, LogType as e, LogObject as f, ConsolaReporter as g, createConsola as h };
