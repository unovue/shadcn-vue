'use strict';

const promises = require('node:fs/promises');
const node_fs = require('node:fs');
const tar = require('tar');
const pathe = require('pathe');
const defu = require('defu');
const node_stream = require('node:stream');
const node_child_process = require('node:child_process');
const node_os = require('node:os');
const node_util = require('node:util');
const nodeFetchNative = require('node-fetch-native');
const createHttpsProxyAgent = require('https-proxy-agent');

async function download(url, filePath, options = {}) {
  const infoPath = filePath + ".json";
  const info = JSON.parse(
    await promises.readFile(infoPath, "utf8").catch(() => "{}")
  );
  const headResponse = await sendFetch(url, {
    method: "HEAD",
    headers: options.headers
  }).catch(() => void 0);
  const etag = headResponse?.headers.get("etag");
  if (info.etag === etag && node_fs.existsSync(filePath)) {
    return;
  }
  info.etag = etag;
  const response = await sendFetch(url, { headers: options.headers });
  if (response.status >= 400) {
    throw new Error(
      `Failed to download ${url}: ${response.status} ${response.statusText}`
    );
  }
  const stream = node_fs.createWriteStream(filePath);
  await node_util.promisify(node_stream.pipeline)(response.body, stream);
  await promises.writeFile(infoPath, JSON.stringify(info), "utf8");
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
  return await nodeFetchNative.fetch(url, options);
}
function cacheDirectory() {
  return process.env.XDG_CACHE_HOME ? pathe.resolve(process.env.XDG_CACHE_HOME, "giget") : pathe.resolve(node_os.homedir(), ".cache/giget");
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
  cwd = pathe.resolve(cwd);
  const shell = currentShell();
  console.info(
    `(experimental) Opening shell in ${pathe.relative(process.cwd(), cwd)}...`
  );
  node_child_process.spawnSync(shell, [], {
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
  options = defu.defu(
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
  const cwd = pathe.resolve(options.cwd || ".");
  const extractPath = pathe.resolve(cwd, options.dir || template.defaultDir);
  if (options.forceClean) {
    await promises.rm(extractPath, { recursive: true, force: true });
  }
  if (!options.force && node_fs.existsSync(extractPath) && node_fs.readdirSync(extractPath).length > 0) {
    throw new Error(`Destination ${extractPath} already exists.`);
  }
  await promises.mkdir(extractPath, { recursive: true });
  const temporaryDirectory = pathe.resolve(
    cacheDirectory(),
    options.provider,
    template.name
  );
  const tarPath = pathe.resolve(
    temporaryDirectory,
    (template.version || template.name) + ".tar.gz"
  );
  if (options.preferOffline && node_fs.existsSync(tarPath)) {
    options.offline = true;
  }
  if (!options.offline) {
    await promises.mkdir(pathe.dirname(tarPath), { recursive: true });
    const s2 = Date.now();
    await download(template.tar, tarPath, {
      headers: {
        authorization: options.auth ? `Bearer ${options.auth}` : void 0,
        ...normalizeHeaders(template.headers)
      }
    }).catch((error) => {
      if (!node_fs.existsSync(tarPath)) {
        throw error;
      }
      debug("Download error. Using cached version:", error);
      options.offline = true;
    });
    debug(`Downloaded ${template.tar} to ${tarPath} in ${Date.now() - s2}ms`);
  }
  if (!node_fs.existsSync(tarPath)) {
    throw new Error(
      `Tarball not found: ${tarPath} (offline: ${options.offline})`
    );
  }
  const s = Date.now();
  const subdir = template.subdir?.replace(/^\//, "") || "";
  await tar.extract({
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

exports.downloadTemplate = downloadTemplate;
exports.registryProvider = registryProvider;
exports.startShell = startShell;
