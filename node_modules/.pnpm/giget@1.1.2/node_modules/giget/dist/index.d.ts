interface GitInfo {
    provider: "github" | "gitlab" | "bitbucket" | "sourcehut";
    repo: string;
    subdir: string;
    ref: string;
}
interface TemplateInfo {
    name: string;
    tar: string;
    version?: string;
    subdir?: string;
    url?: string;
    defaultDir?: string;
    headers?: Record<string, string>;
    source?: never;
    dir?: never;
    [key: string]: any;
}
type TemplateProvider = (input: string, options: {
    auth?: string;
}) => TemplateInfo | Promise<TemplateInfo> | null;

interface DownloadTemplateOptions {
    provider?: string;
    force?: boolean;
    forceClean?: boolean;
    offline?: boolean;
    preferOffline?: boolean;
    providers?: Record<string, TemplateProvider>;
    dir?: string;
    registry?: false | string;
    cwd?: string;
    auth?: string;
}
type DownloadTemplateResult = Omit<TemplateInfo, "dir" | "source"> & {
    dir: string;
    source: string;
};
declare function downloadTemplate(input: string, options?: DownloadTemplateOptions): Promise<DownloadTemplateResult>;

declare const registryProvider: (registryEndpoint?: string, options?: {
    auth?: string;
}) => TemplateProvider;

declare function startShell(cwd: string): void;

export { DownloadTemplateOptions, DownloadTemplateResult, GitInfo, TemplateInfo, TemplateProvider, downloadTemplate, registryProvider, startShell };
