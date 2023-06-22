import { JITI } from 'jiti';
import { JITIOptions } from 'jiti/dist/types';
import { WatchOptions } from 'chokidar';
import { diff } from 'ohash';

interface DotenvOptions {
    /**
     * The project root directory (either absolute or relative to the current working directory).
     */
    cwd: string;
    /**
     * What file to look in for environment variables (either absolute or relative
     * to the current working directory). For example, `.env`.
     */
    fileName?: string;
    /**
     * Whether to interpolate variables within .env.
     *
     * @example
     * ```env
     * BASE_DIR="/test"
     * # resolves to "/test/further"
     * ANOTHER_DIR="${BASE_DIR}/further"
     * ```
     */
    interpolate?: boolean;
    /**
     * An object describing environment variables (key, value pairs).
     */
    env?: NodeJS.ProcessEnv;
}
type Env = typeof process.env;
/**
 * Load and interpolate environment variables into `process.env`.
 * If you need more control (or access to the values), consider using `loadDotenv` instead
 *
 */
declare function setupDotenv(options: DotenvOptions): Promise<Env>;
/** Load environment variables into an object. */
declare function loadDotenv(options: DotenvOptions): Promise<Env>;

interface ConfigLayerMeta {
    name?: string;
    [key: string]: any;
}
type UserInputConfig = Record<string, any>;
interface C12InputConfig<T extends UserInputConfig = UserInputConfig, MT extends ConfigLayerMeta = ConfigLayerMeta> {
    $test?: T;
    $development?: T;
    $production?: T;
    $env?: Record<string, T>;
    $meta?: MT;
}
type InputConfig<T extends UserInputConfig = UserInputConfig, MT extends ConfigLayerMeta = ConfigLayerMeta> = C12InputConfig<T, MT> & T;
interface SourceOptions<T extends UserInputConfig = UserInputConfig, MT extends ConfigLayerMeta = ConfigLayerMeta> {
    meta?: MT;
    overrides?: T;
    [key: string]: any;
}
interface ConfigLayer<T extends UserInputConfig = UserInputConfig, MT extends ConfigLayerMeta = ConfigLayerMeta> {
    config: T | null;
    source?: string;
    sourceOptions?: SourceOptions<T, MT>;
    meta?: MT;
    cwd?: string;
    configFile?: string;
}
interface ResolvedConfig<T extends UserInputConfig = UserInputConfig, MT extends ConfigLayerMeta = ConfigLayerMeta> extends ConfigLayer<T, MT> {
    layers?: ConfigLayer<T, MT>[];
    cwd?: string;
}
interface LoadConfigOptions<T extends UserInputConfig = UserInputConfig, MT extends ConfigLayerMeta = ConfigLayerMeta> {
    name?: string;
    cwd?: string;
    configFile?: string;
    rcFile?: false | string;
    globalRc?: boolean;
    dotenv?: boolean | DotenvOptions;
    envName?: string | false;
    packageJson?: boolean | string | string[];
    defaults?: T;
    defaultConfig?: T;
    overrides?: T;
    resolve?: (id: string, options: LoadConfigOptions<T, MT>) => null | undefined | ResolvedConfig<T, MT> | Promise<ResolvedConfig<T, MT> | undefined | null>;
    jiti?: JITI;
    jitiOptions?: JITIOptions;
    extend?: false | {
        extendKey?: string | string[];
    };
}
type DefineConfig<T extends UserInputConfig = UserInputConfig, MT extends ConfigLayerMeta = ConfigLayerMeta> = (input: InputConfig<T, MT>) => InputConfig<T, MT>;
declare function createDefineConfig<T extends UserInputConfig = UserInputConfig, MT extends ConfigLayerMeta = ConfigLayerMeta>(): DefineConfig<T, MT>;

declare function loadConfig<T extends UserInputConfig = UserInputConfig, MT extends ConfigLayerMeta = ConfigLayerMeta>(options: LoadConfigOptions<T, MT>): Promise<ResolvedConfig<T, MT>>;

type ConfigWatcher<T extends UserInputConfig = UserInputConfig, MT extends ConfigLayerMeta = ConfigLayerMeta> = ResolvedConfig<T, MT> & {
    watchingFiles: string[];
    unwatch: () => Promise<void>;
};
interface WatchConfigOptions<T extends UserInputConfig = UserInputConfig, MT extends ConfigLayerMeta = ConfigLayerMeta> extends LoadConfigOptions<T, MT> {
    chokidarOptions?: WatchOptions;
    debounce?: false | number;
    onWatch?: (event: {
        type: "created" | "updated" | "removed";
        path: string;
    }) => void | Promise<void>;
    acceptHMR?: (context: {
        getDiff: () => ReturnType<typeof diff>;
        newConfig: ResolvedConfig<T, MT>;
        oldConfig: ResolvedConfig<T, MT>;
    }) => void | boolean | Promise<void | boolean>;
    onUpdate?: (context: {
        getDiff: () => ReturnType<typeof diff>;
        newConfig: ResolvedConfig<T, MT>;
        oldConfig: ResolvedConfig<T, MT>;
    }) => void | Promise<void>;
}
declare function watchConfig<T extends UserInputConfig = UserInputConfig, MT extends ConfigLayerMeta = ConfigLayerMeta>(options: WatchConfigOptions<T, MT>): Promise<ConfigWatcher<T, MT>>;

export { C12InputConfig, ConfigLayer, ConfigLayerMeta, ConfigWatcher, DefineConfig, DotenvOptions, Env, InputConfig, LoadConfigOptions, ResolvedConfig, SourceOptions, UserInputConfig, WatchConfigOptions, createDefineConfig, loadConfig, loadDotenv, setupDotenv, watchConfig };
