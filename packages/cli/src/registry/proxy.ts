import { createFetch, ofetch } from "ofetch"
import { EnvHttpProxyAgent, fetch, Headers } from "undici"

const PROXY_ENV_KEYS = ["https_proxy", "HTTPS_PROXY", "http_proxy", "HTTP_PROXY"]

// Shared by every registry fetch so we only build one agent per process.
// `EnvHttpProxyAgent` picks the proxy per protocol and honours NO_PROXY.
const agent = PROXY_ENV_KEYS.some(key => process.env[key])
  ? new EnvHttpProxyAgent()
  : undefined

// The global `fetch` of Node.js uses its own bundled copy of undici, which
// rejects dispatchers from a different undici major (e.g. undici 8 on
// Node.js 24 fails with UND_ERR_INVALID_ARG before sending anything). Proxied
// requests therefore go through the `fetch` (and `Headers`) of the undici the
// agent belongs to.
export const registryFetch = agent
  ? createFetch({
      fetch: ((input, init) =>
        fetch(input as Parameters<typeof fetch>[0], {
          ...(init as Parameters<typeof fetch>[1]),
          dispatcher: agent,
        })) as typeof globalThis.fetch,
      Headers: Headers as typeof globalThis.Headers,
      AbortController: globalThis.AbortController,
    })
  : ofetch
