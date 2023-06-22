import { readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { existsSync, createWriteStream, readdirSync } from 'node:fs';
import { extract } from 'tar';
import { resolve, relative, dirname } from 'pathe';
import { defu } from 'defu';
import { pipeline } from 'node:stream';
import { spawnSync } from 'node:child_process';
import { homedir } from 'node:os';
import { promisify } from 'node:util';
import { fetch } from 'node-fetch-native';
import createHttpsProxyAgent from 'https-proxy-agent';

async function download(url, filePath, options = {}) {
  const infoPath = filePath + ".json";
  const info = JSON.parse(
    await readFile(infoPath, "utf8").catch(() => "{}")
  );
  const headResponse = await sendFetch(url, {
    method: "HEAD",
    headers: options.headers
  }).catch(() => void 0);
  const etag = headResponse?.headers.get("etag");
  if (info.etag === etag && existsSync(filePath)) {
    return;
  }
  info.etag = etag;
  const response = await sendFetch(url, { headers: options.headers });
  if (response.status >= 400) {
    throw new Error(
      `Failed to download ${url}: ${response.status} ${response.statusText}`
    );
  }
  const stream = createWriteStream(filePath);
  await promisify(pipeline)(response.body, stream);
  await writeFile(infoPath, JSON.stringify(info), "utf8");
}
const inputRegex = /^(?<repo>[\w.-]+\/[\w.-]+)(?<subdir>[^#]+)?(?<ref>#[\w.-]+)?/;
function parseGitURI(input) {
  const m = input.match(inputRegex)?.groups;
  return {
    repo: m.repo,
    subdir: m.subdir || "/",
    ref: m.ref ? m.ref.slice(1) : "main"
  };
}
function debug(...arguments_) {
  if (process.env.DEBUG) {
    console.debug("[giget]", ...arguments_);
  }
}
async function sendFetch(url, options = {}) {
  if (!options.agent) {
    const proxyEnv = process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy;
    if (proxyEnv) {
      options.agent = createHttpsProxyAgent(proxyEnv);
    }
  }
  if (options?.headers) {
    options.headers = normalizeHeaders(options.headers);
  }
  return await fetch(url, options);
}
function cacheDirectory() {
  return process.env.XDG_CACHE_HOME ? resolve(process.env.XDG_CACHE_HOME, "giget") : resolve(homedir(), ".cache/giget");
}
function normalizeHeaders(headers = {}) {
  const normalized = {};
  for (const [key, value] of Object.entries(headers)) {
    if (!value) {
      continue;
    }
    normalized[key.toLowerCase()] = value;
  }
  return normalized;
}
function currentShell() {
  if (process.env.SHELL) {
    return process.env.SHELL;
  }
  if (process.platform === "win32") {
    return "cmd.exe";
  }
  return "/bin/bash";
}
function startShell(cwd) {
  cwd = resolve(cwd);
  const shell = currentShell();
  console.info(
    `(experimental) Opening shell in ${relative(process.cwd(), cwd)}...`
  );
  spawnSync(shell, [], {
    cwd,
    shell: true,
    stdio: "inherit"
  });
}

const github = (input, options) => {
  const parsed = parseGitURI(input);
  const github2 = process.env.GIGET_GITHUB_URL || "https://github.com";
  return {
    name: parsed.repo.replace("/", "-"),
    version: parsed.ref,
    subdir: parsed.subdir,
    headers: {
      authorization: options.auth ? `Bearer ${options.auth}` : void 0
    },
    url: `${github2}/${parsed.repo}/tree/${parsed.ref}${parsed.subdir}`,
    tar: `${github2}/${parsed.repo}/archive/${parsed.ref}.tar.gz`
  };
};
const gitlab = (input, options) => {
  const parsed = parseGitURI(input);
  const gitlab2 = process.env.GIGET_GITLAB_URL || "https://gitlab.com";
  return {
    name: parsed.repo.replace("/", "-"),
    version: parsed.ref,
    subdir: parsed.subdir,
    headers: {
      authorization: options.auth ? `Bearer ${options.auth}` : void 0
    },
    url: `${gitlab2}/${parsed.repo}/tree/${parsed.ref}${parsed.subdir}`,
    tar: `${gitlab2}/${parsed.repo}/-/archive/${parsed.ref}.tar.gz`
  };
};
const bitbucket = (input, options) => {
  const parsed = parseGitURI(input);
  return {
    name: parsed.repo.replace("/", "-"),
    version: parsed.ref,
    subdir: parsed.subdir,
    headers: {
      authorization: options.auth ? `Bearer ${options.auth}` : void 0
    },
    url: `https://bitbucket.com/${parsed.repo}/src/${parsed.ref}${parsed.subdir}`,
    tar: `https://bitbucket.org/${parsed.repo}/get/${parsed.ref}.tar.gz`
  };
};
const sourcehut = (input, options) => {
  const parsed = parseGitURI(input);
  return {
    name: parsed.repo.replace("/", "-"),
    version: parsed.ref,
    subdir: parsed.subdir,
    headers: {
      authorization: options.auth ? `Bearer ${options.auth}` : void 0
    },
    url: `https://git.sr.ht/~${parsed.repo}/tree/${parsed.ref}/item${parsed.subdir}`,
    tar: `https://git.sr.ht/~${parsed.repo}/archive/${parsed.ref}.tar.gz`
  };
};
const providers = {
  github,
  gh: github,
  gitlab,
  bitbucket,
  sourcehut
};

const DEFAULT_REGISTRY = "https://raw.githubusercontent.com/unjs/giget/main/templates";
const registryProvider = (registryEndpoint = DEFAULT_REGISTRY, options) => {
  options = options || {};
  return async (input) => {
    const start = Date.now();
    const registryURL = `${registryEndpoint}/${input}.json`;
    const result = await sendFetch(registryURL, {
      headers: {
        authorization: options.auth ? `Bearer ${options.auth}` : void 0
      }
    });
    if (result.status >= 400) {
      throw new Error(
        `Failed to download ${input} template info from ${registryURL}: ${result.status} ${result.statusText}`
      );
    }
    const info = await result.json();
    if (!info.tar || !info.name) {
      throw new Error(
        `Invalid template info from ${registryURL}. name or tar fields are missing!`
      );
    }
    debug(
      `Fetched ${input} template info from ${registryURL} in ${Date.now() - start}ms`
    );
    return info;
  };
};

const sourceProtoRe = /^([\w-.]+):/;
async function downloadTemplate(input, options = {}) {
  options = defu(
    {
      registry: process.env.GIGET_REGISTRY,
      auth: process.env.GIGET_AUTH
    },
    options
  );
  const registry = options.registry !== false ? registryProvider(options.registry, { auth: options.auth }) : void 0;
  let providerName = options.provider || (registryProvider ? "registry" : "github");
  let source = input;
  const sourceProvierMatch = input.match(sourceProtoRe);
  if (sourceProvierMatch) {
    providerName = sourceProvierMatch[1];
    source = input.slice(sourceProvierMatch[0].length);
  }
  const provider = options.providers?.[providerName] || providers[providerName] || registry;
  if (!provider) {
    throw new Error(`Unsupported provider: ${providerName}`);
  }
  const template = await Promise.resolve().then(() => provider(source, { auth: options.auth })).catch((error) => {
    throw new Error(
      `Failed to download template from ${providerName}: ${error.message}`
    );
  });
  template.name = (template.name || "template").replace(/[^\da-z-]/gi, "-");
  template.defaultDir = (template.defaultDir || template.name).replace(
    /[^\da-z-]/gi,
    "-"
  );
  const cwd = resolve(options.cwd || ".");
  const extractPath = resolve(cwd, options.dir || template.defaultDir);
  if (options.forceClean) {
    await rm(extractPath, { recursive: true, force: true });
  }
  if (!options.force && existsSync(extractPath) && readdirSync(extractPath).length > 0) {
    throw new Error(`Destination ${extractPath} already exists.`);
  }
  await mkdir(extractPath, { recursive: true });
  const temporaryDirectory = resolve(
    cacheDirectory(),
    options.provider,
    template.name
  );
  const tarPath = resolve(
    temporaryDirectory,
    (template.version || template.name) + ".tar.gz"
  );
  if (options.preferOffline && existsSync(tarPath)) {
    options.offline = true;
  }
  if (!options.offline) {
    await mkdir(dirname(tarPath), { recursive: true });
    const s2 = Date.now();
    await download(template.tar, tarPath, {
      headers: {
        authorization: options.auth ? `Bearer ${options.auth}` : void 0,
        ...normalizeHeaders(template.headers)
      }
    }).catch((error) => {
      if (!existsSync(tarPath)) {
        throw error;
      }
      debug("Download error. Using cached version:", error);
      options.offline = true;
    });
    debug(`Downloaded ${template.tar} to ${tarPath} in ${Date.now() - s2}ms`);
  }
  if (!existsSync(tarPath)) {
    throw new Error(
      `Tarball not found: ${tarPath} (offline: ${options.offline})`
    );
  }
  const s = Date.now();
  const subdir = template.subdir?.replace(/^\//, "") || "";
  await extract({
    file: tarPath,
    cwd: extractPath,
    onentry(entry) {
      entry.path = entry.path.split("/").splice(1).join("/");
      if (subdir) {
        if (entry.path.startsWith(subdir + "/")) {
          entry.path = entry.path.slice(subdir.length);
        } else {
          entry.path = "";
        }
      }
    }
  });
  debug(`Extracted to ${extractPath} in ${Date.now() - s}ms`);
  return {
    ...template,
    source,
    dir: extractPath
  };
}

export { downloadTemplate as d, registryProvider as r, startShell as s };
