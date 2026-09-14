import { createFetch, ofetch } from "ofetch"
import { fetch, ProxyAgent } from "undici"

// Shared by every registry fetch so we only build one agent per process.
const agent = process.env.https_proxy
  ? new ProxyAgent(process.env.https_proxy)
  : undefined

// The global `fetch` of Node.js uses its own bundled copy of undici, which
// rejects dispatchers from a different undici major (e.g. undici 8 on
// Node.js 24 fails with UND_ERR_INVALID_ARG before sending anything). Proxied
// requests therefore go through the `fetch` of the undici the agent belongs to.
export const registryFetch = agent
  ? createFetch({
      fetch: ((input, init) =>
        fetch(input as Parameters<typeof fetch>[0], {
          ...(init as Parameters<typeof fetch>[1]),
          dispatcher: agent,
        })) as typeof globalThis.fetch,
      Headers: globalThis.Headers,
      AbortController: globalThis.AbortController,
    })
  : ofetch
