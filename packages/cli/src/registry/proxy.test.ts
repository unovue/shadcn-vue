import type { AddressInfo } from "node:net"
import { createServer, request } from "node:http"
import { ofetch } from "ofetch"
import { afterEach, describe, expect, it, vi } from "vitest"

const servers: ReturnType<typeof createServer>[] = []

function listen(server: ReturnType<typeof createServer>) {
  servers.push(server)
  return new Promise<number>((resolve) => {
    server.listen(0, "127.0.0.1", () =>
      resolve((server.address() as AddressInfo).port))
  })
}

function listenRegistry() {
  return listen(createServer((_req, res) => {
    res.setHeader("content-type", "application/json")
    res.end(JSON.stringify({ name: "button" }))
  }))
}

// A forwarding proxy for plain http targets that also records CONNECT
// tunnels (which it refuses) for https targets.
async function listenProxy() {
  const proxied: string[] = []
  const server = createServer((req, res) => {
    proxied.push(req.url ?? "")
    const upstream = request(req.url!, { method: req.method, headers: req.headers }, (upstreamRes) => {
      res.writeHead(upstreamRes.statusCode ?? 502, upstreamRes.headers)
      upstreamRes.pipe(res)
    })
    upstream.on("error", () => res.destroy())
    req.pipe(upstream)
  })
  server.on("connect", (req, socket) => {
    proxied.push(`CONNECT ${req.url}`)
    socket.end("HTTP/1.1 403 Forbidden\r\n\r\n")
  })
  const port = await listen(server)
  return { proxied, url: `http://127.0.0.1:${port}` }
}

afterEach(() => {
  for (const server of servers.splice(0)) {
    server.closeAllConnections()
    server.close()
  }
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe("registryFetch", () => {
  it("uses ofetch directly when no proxy is configured", async () => {
    const { registryFetch } = await import("./proxy")

    expect(registryFetch).toBe(ofetch)
  })

  it("sends http requests through the proxy from http_proxy", async () => {
    const registryPort = await listenRegistry()
    const proxy = await listenProxy()

    vi.stubEnv("http_proxy", proxy.url)
    const { registryFetch } = await import("./proxy")

    const url = `http://127.0.0.1:${registryPort}/r/button.json`
    const data = await registryFetch(url, { retry: 0 })

    expect(data).toEqual({ name: "button" })
    expect(proxy.proxied).toEqual([url])
  })

  it("tunnels https requests through the proxy from HTTPS_PROXY", async () => {
    const proxy = await listenProxy()

    vi.stubEnv("HTTPS_PROXY", proxy.url)
    const { registryFetch } = await import("./proxy")

    await expect(registryFetch("https://registry.test/r/button.json", { retry: 0 }))
      .rejects
      .toThrow()
    expect(proxy.proxied).toEqual(["CONNECT registry.test:443"])
  })

  it("skips the proxy for hosts in NO_PROXY", async () => {
    const registryPort = await listenRegistry()
    const proxy = await listenProxy()

    vi.stubEnv("http_proxy", proxy.url)
    vi.stubEnv("no_proxy", "127.0.0.1")
    const { registryFetch } = await import("./proxy")

    const data = await registryFetch(`http://127.0.0.1:${registryPort}/r/button.json`, { retry: 0 })

    expect(data).toEqual({ name: "button" })
    expect(proxy.proxied).toEqual([])
  })
})
