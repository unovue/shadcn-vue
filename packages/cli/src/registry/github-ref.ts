import type {
  ResolvedGitHubItemAddress,
  ResolvedGitHubRegistrySource,
} from "@/src/registry/address"
import { x } from "tinyexec"
import { RegistrySourceFileError } from "@/src/registry/errors"

const GITHUB_URL = "https://github.com"
// SHA-1 object ids only. GitHub does not serve SHA-256 repositories yet; if it
// ever does, parseGitLsRemote will silently drop the 64-character ids and a ref
// will look missing rather than unsupported.
const GITHUB_SHA_PATTERN = /^[a-f0-9]{40}$/i
const GITHUB_REF_RESOLUTION_TIMEOUT = 15_000

export type GitHubSource = ResolvedGitHubItemAddress | ResolvedGitHubRegistrySource

export interface GitHubRefResolverOptions {
  cache?: Map<string, Promise<string>>
}

// Resolves a ref to a commit SHA. When no ref is given we ask the remote for
// HEAD, which is the repository's default branch - we never assume "main",
// since plenty of registries still sit on "master" and a wrong guess would
// surface as a confusing 404 on raw.githubusercontent.com.
export async function resolveGitHubRef(
  address: GitHubSource,
  options: GitHubRefResolverOptions = {},
) {
  const ref = address.ref ?? "HEAD"

  // A full SHA is already what we want to pin to.
  if (GITHUB_SHA_PATTERN.test(ref)) {
    return ref.toLowerCase()
  }

  const cacheKey = `${address.owner}/${address.repo}#${ref}`
  const cached = options.cache?.get(cacheKey)
  if (cached) {
    return cached
  }

  const promise = resolveGitHubRefUncached(address, ref).catch((error) => {
    // Do not cache a failure - a later attempt may succeed.
    options.cache?.delete(cacheKey)
    throw error
  })
  options.cache?.set(cacheKey, promise)

  return promise
}

async function resolveGitHubRefUncached(address: GitHubSource, ref: string) {
  const repoUrl = `${GITHUB_URL}/${address.owner}/${address.repo}.git`
  const candidates = getPreferredGitHubRefNames(ref)

  let stdout: string
  let timedOut = false
  const controller = new AbortController()
  const timeout = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, GITHUB_REF_RESOLUTION_TIMEOUT)

  try {
    // `--` keeps a hostile ref from being read as a git option. The ref is
    // validated in address.ts as well, this is the second lock on the door.
    const result = await x(
      "git",
      ["ls-remote", "--symref", "--", repoUrl, ...candidates],
      {
        nodeOptions: {
          env: {
            ...process.env,
            // Never sit at an interactive credential prompt. A private repo
            // should fail fast rather than hang the CLI.
            GIT_TERMINAL_PROMPT: "0",
          },
        },
        signal: controller.signal,
        throwOnError: true,
      },
    )
    stdout = result.stdout
  }
  catch (error) {
    throw createGitHubRefResolutionError(address, ref, repoUrl, error, timedOut)
  }
  finally {
    clearTimeout(timeout)
  }

  const refs = parseGitLsRemote(stdout)
  for (const candidate of getPreferredGitHubRefNames(ref)) {
    const sha = refs.get(candidate)
    if (sha) {
      return sha
    }
  }

  throw new RegistrySourceFileError("registry.json", undefined, {
    message: `Could not resolve GitHub ref "${ref}" for ${address.owner}/${address.repo}.`,
    context: {
      reason: "github-ref-resolution",
      source: formatGitHubSource(address),
      ref,
      repoUrl,
    },
    suggestion:
      "Use an existing branch, tag, or full commit SHA. For example: \"owner/repo/item#main\" or \"owner/repo/item#v1.0.0\".",
  })
}

// Branches win over tags, and an annotated tag resolves to the commit it
// points at (`^{}`) rather than to the tag object. Every branch returns
// distinct names, so this doubles as the `ls-remote` argument list.
export function getPreferredGitHubRefNames(ref: string) {
  if (ref === "HEAD") {
    return ["HEAD"]
  }

  if (ref.startsWith("refs/tags/")) {
    return [`${ref}^{}`, ref]
  }

  if (ref.startsWith("refs/")) {
    return [ref]
  }

  return [`refs/heads/${ref}`, `refs/tags/${ref}^{}`, `refs/tags/${ref}`, ref]
}

export function parseGitLsRemote(stdout: string) {
  const refs = new Map<string, string>()

  for (const line of stdout.split("\n")) {
    const trimmed = line.trim()
    // `--symref` prints a `ref: refs/heads/main\tHEAD` line we do not need.
    if (!trimmed || trimmed.startsWith("ref:")) {
      continue
    }

    const [sha, ref] = trimmed.split(/\s+/)
    if (sha && ref && GITHUB_SHA_PATTERN.test(sha)) {
      refs.set(ref, sha.toLowerCase())
    }
  }

  return refs
}

function createGitHubRefResolutionError(
  address: GitHubSource,
  ref: string,
  repoUrl: string,
  error: unknown,
  timedOut: boolean,
) {
  return new RegistrySourceFileError("registry.json", error, {
    message: `Failed to resolve GitHub ref "${ref}" for ${address.owner}/${address.repo}.`,
    context: {
      reason: "github-ref-resolution",
      source: formatGitHubSource(address),
      ref,
      repoUrl,
    },
    suggestion: getGitHubRefResolutionSuggestion(error, timedOut),
  })
}

function getGitHubRefResolutionSuggestion(error: unknown, timedOut: boolean) {
  if (isGitNotFoundError(error)) {
    return "Install Git and try again. Git is required to resolve GitHub registry refs."
  }

  if (timedOut) {
    return "GitHub ref resolution timed out. Check your network connection and try again."
  }

  return "Check that the public GitHub repository exists and the ref is accessible. Private repositories are not supported. If you meant a registry configured in components.json, prefix it with \"@\" instead."
}

function isGitNotFoundError(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return false
  }

  if ("code" in error && error.code === "ENOENT") {
    return true
  }

  // tinyexec surfaces the spawn failure on `cause` when throwOnError is set.
  return (
    "cause" in error
    && typeof error.cause === "object"
    && error.cause !== null
    && "code" in error.cause
    && error.cause.code === "ENOENT"
  )
}

function formatGitHubSource(address: GitHubSource) {
  return `${address.owner}/${address.repo}#${address.ref ?? "HEAD"}`
}
