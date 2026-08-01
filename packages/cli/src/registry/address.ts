import { RegistryValidationError } from "@/src/registry/errors"
import { parseRegistryAndItemFromString } from "@/src/registry/parser"
import { isLocalFile, isUrl } from "@/src/registry/utils"

// https://docs.github.com/en/enterprise-cloud@latest/admin/managing-accounts-and-repositories/managing-users-in-your-enterprise/username-considerations-for-external-authentication
const GITHUB_OWNER_PATTERN = /^(?!.*--)[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/i
const GITHUB_REPO_PATTERN = /^[\w.-]+$/
const INVALID_GITHUB_REPO_NAMES = new Set([".", ".."])
// eslint-disable-next-line no-control-regex
const CONTROL_CHARACTER_PATTERN = /[\x00-\x1F\x7F]/
const WHITESPACE_PATTERN = /\s/
// A ref that starts with a dash would be read by git as a command line option.
const GITHUB_REF_OPTION_PATTERN = /^-/

export type ResolvedItemAddress
  = | {
    scheme: "shadcn"
    item: string
  }
  | {
    scheme: "namespace"
    namespace: string
    item: string
  }
  | {
    scheme: "url"
    url: string
  }
  | {
    scheme: "file"
    path: string
  }
  | {
    scheme: "github"
    owner: string
    repo: string
    item: string
    ref?: string
  }

export interface ResolvedGitHubRegistrySource {
  owner: string
  repo: string
  ref?: string
}

export type ResolvedGitHubItemAddress = Extract<
  ResolvedItemAddress,
  { scheme: "github" }
>

// Classifies an `add` argument into the scheme that should resolve it.
// The order matters: urls and local files win over the bare `owner/repo/item`
// form, and a configured `@namespace/item` wins over everything else.
export function resolveItemAddress(address: string) {
  if (isUrl(address)) {
    return {
      scheme: "url",
      url: address,
    } satisfies ResolvedItemAddress
  }

  if (isLocalFile(address)) {
    return {
      scheme: "file",
      path: address,
    } satisfies ResolvedItemAddress
  }

  const { registry, item } = parseRegistryAndItemFromString(address)
  if (registry) {
    return {
      scheme: "namespace",
      namespace: registry,
      item,
    } satisfies ResolvedItemAddress
  }

  const githubAddress = resolveGitHubItemAddress(address)
  if (githubAddress) {
    return githubAddress
  }

  return {
    scheme: "shadcn",
    item: address,
  } satisfies ResolvedItemAddress
}

export function isGitHubItemAddress(address: string) {
  return resolveItemAddress(address).scheme === "github"
}

// Parses a registry source i.e `owner/repo` or `owner/repo#ref`.
// Unlike an item address this does not carry an item name.
export function resolveGitHubRegistrySource(source: string) {
  const hashIndex = source.indexOf("#")
  const path = hashIndex === -1 ? source : source.slice(0, hashIndex)
  const ref = hashIndex === -1 ? undefined : source.slice(hashIndex + 1)
  const parts = path.split("/")

  if (parts.length !== 2) {
    return null
  }

  const [owner, repo] = parts
  if (!isGitHubOwner(owner) || !isGitHubRepo(repo)) {
    return null
  }

  if (ref !== undefined && !isValidGitHubRef(ref)) {
    throw new RegistryValidationError(
      `Invalid GitHub ref in registry source "${source}".`,
      {
        context: {
          source,
          ref,
        },
        suggestion:
          "Use a non-empty branch, tag, or commit SHA without whitespace, control characters or leading dashes.",
      },
    )
  }

  return {
    owner,
    repo,
    ref,
  } satisfies ResolvedGitHubRegistrySource
}

export function isGitHubRegistrySource(source: string) {
  return resolveGitHubRegistrySource(source) !== null
}

function resolveGitHubItemAddress(address: string) {
  const hashIndex = address.indexOf("#")
  const source = hashIndex === -1 ? address : address.slice(0, hashIndex)
  const ref = hashIndex === -1 ? undefined : address.slice(hashIndex + 1)
  const parts = source.split("/")

  // We need at least owner, repo and item.
  if (parts.length < 3) {
    return null
  }

  const [owner, repo, ...itemParts] = parts
  if (!isGitHubOwner(owner) || !isGitHubRepo(repo)) {
    return null
  }

  // Everything after `owner/repo` is the item name. A nested name like
  // `owner/repo/forms/login` refers to the item named "forms/login" in the
  // root registry.json. It is not a path to a nested registry.json.
  const item = itemParts.join("/")
  if (!item) {
    return null
  }

  if (ref !== undefined && !isValidGitHubRef(ref)) {
    throw new RegistryValidationError(
      `Invalid GitHub ref in item address "${address}".`,
      {
        context: {
          address,
          ref,
        },
        suggestion:
          "Use a non-empty branch, tag, or commit SHA without whitespace, control characters or leading dashes.",
      },
    )
  }

  return {
    scheme: "github",
    owner,
    repo,
    item,
    ref,
  } satisfies ResolvedGitHubItemAddress
}

function isGitHubOwner(owner: string) {
  return GITHUB_OWNER_PATTERN.test(owner)
}

function isGitHubRepo(repo: string) {
  return GITHUB_REPO_PATTERN.test(repo) && !INVALID_GITHUB_REPO_NAMES.has(repo)
}

function isValidGitHubRef(ref: string) {
  return (
    !!ref
    && !CONTROL_CHARACTER_PATTERN.test(ref)
    && !WHITESPACE_PATTERN.test(ref)
    && !GITHUB_REF_OPTION_PATTERN.test(ref)
  )
}
