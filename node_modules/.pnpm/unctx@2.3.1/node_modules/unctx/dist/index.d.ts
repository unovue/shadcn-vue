import { AsyncLocalStorage } from 'node:async_hooks';

interface UseContext<T> {
    /**
     * Get the current context. Throws if no context is set.
     */
    use: () => T;
    /**
     * Get the current context. Returns `null` when no context is set.
     */
    tryUse: () => T | null;
    /**
     * Set the context as Singleton Pattern.
     */
    set: (instance?: T, replace?: boolean) => void;
    /**
     * Clear current context.
     */
    unset: () => void;
    /**
     * Exclude a synchronous function with the provided context.
     */
    call: <R>(instance: T, callback: () => R) => R;
    /**
     * Exclude an asynchronous function with the provided context.
     * Requires installing the transform plugin to work properly.
     */
    callAsync: <R>(instance: T, callback: () => R | Promise<R>) => Promise<R>;
}
interface ContextOptions {
    asyncContext?: boolean;
    AsyncLocalStorage?: typeof AsyncLocalStorage;
}
declare function createContext<T = any>(opts?: ContextOptions): UseContext<T>;
interface ContextNamespace {
    get: <T>(key: string, opts?: ContextOptions) => UseContext<T>;
}
declare function createNamespace<T = any>(defaultOpts?: ContextOptions): {
    get(key: any, opts?: ContextOptions): UseContext<T>;
};
declare const defaultNamespace: ContextNamespace;
declare const getContext: <T>(key: string, opts?: ContextOptions) => UseContext<T>;
declare const useContext: <T>(key: string, opts?: ContextOptions) => () => T;
type AsyncFunction<T> = () => Promise<T>;
declare function executeAsync<T>(function_: AsyncFunction<T>): [Promise<T>, () => void];
declare function withAsyncContext<T = any>(function_: AsyncFunction<T>, transformed?: boolean): AsyncFunction<T>;

export { ContextNamespace, ContextOptions, UseContext, createContext, createNamespace, defaultNamespace, executeAsync, getContext, useContext, withAsyncContext };
