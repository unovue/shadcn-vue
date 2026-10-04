import type { AddressInfo } from "node:net"
import { createServer, request } from "node:http"
import { afterEach, describe, expect, it, vi } from "vitest"

const servers: ReturnType<typeof createServer>[] = []

function listen(server: ReturnType<typeof createServer>) {
  servers.push(server)
  return new Promise<number>((resolve) => {
    server.listen(0, "127.0.0.1", () =>
      resolve((server.address() as AddressInfo).port))
  })
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
  it("sends requests through the proxy from https_proxy", async () => {
    const registryPort = await listen(createServer((_req, res) => {
      res.setHeader("content-type", "application/json")
      res.end(JSON.stringify({ name: "button" }))
    }))

    // A forwarding proxy for plain http targets.
    const proxied: string[] = []
    const proxyPort = await listen(createServer((req, res) => {
      proxied.push(req.url ?? "")
      const upstream = request(req.url!, { method: req.method, headers: req.headers }, (upstreamRes) => {
        res.writeHead(upstreamRes.statusCode ?? 502, upstreamRes.headers)
        upstreamRes.pipe(res)
      })
      upstream.on("error", () => res.destroy())
      req.pipe(upstream)
    }))

    vi.stubEnv("https_proxy", `http://127.0.0.1:${proxyPort}`)
    const { registryFetch } = await import("./proxy")

    const url = `http://127.0.0.1:${registryPort}/r/button.json`
    const data = await registryFetch(url, { retry: 0 })

    expect(data).toEqual({ name: "button" })
    expect(proxied).toEqual([url])
  })
})
