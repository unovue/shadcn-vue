import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { REGISTRY_URL } from "@/src/registry/constants"
import {
  clearRegistryContext,
  setRegistryHeaders,
} from "@/src/registry/context"
import {
  RegistryErrorCode,
  RegistryNotFoundError,
  RegistryStyleNotFoundError,
} from "@/src/registry/errors"
import { clearRegistryCache, fetchRegistry } from "./fetcher"

const server = setupServer()

// Every request msw sees, so a test can assert that no fallback probe fired.
const requests: { method: string, url: string }[] = []

server.events.on("request:start", ({ request }) => {
  requests.push({ method: request.method, url: request.url })
})

function headRequests() {
  return requests.filter(request => request.method === "HEAD")
}

function mockItem(
  { style, name, status }: { style: string, name: string, status: number },
) {
  return [
    http.get(`${REGISTRY_URL}/styles/${style}/${name}.json`, () =>
      HttpResponse.json({ error: "Not found" }, { status })),
  ]
}

function mockFallback(
  { name, status }: { name: string, status: number },
) {
  return http.head(
    `${REGISTRY_URL}/styles/new-york-v4/${name}.json`,
    () => new HttpResponse(null, { status }),
  )
}

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
beforeEach(() => {
  clearRegistryCache()
  clearRegistryContext()
  requests.length = 0
})
afterEach(() => server.resetHandlers())
afterAll(() => {
  server.events.removeAllListeners()
  server.close()
})

describe("fetchRegistry - tailwind v4 style fallback", () => {
  it("should throw RegistryStyleNotFoundError when the item only exists for new-york-v4", async () => {
    server.use(
      ...mockItem({ style: "new-york", name: "message", status: 404 }),
      mockFallback({ name: "message", status: 200 }),
    )

    await expect(
      fetchRegistry(["styles/new-york/message.json"], { useCache: false }),
    ).rejects.toBeInstanceOf(RegistryStyleNotFoundError)
  })

  it("should expose the v4 url and style on the error", async () => {
    server.use(
      ...mockItem({ style: "new-york", name: "message", status: 404 }),
      mockFallback({ name: "message", status: 200 }),
    )

    try {
      await fetchRegistry(["styles/new-york/message.json"], { useCache: false })
      expect.unreachable("expected fetchRegistry to throw")
    }
    catch (error) {
      expect(error).toBeInstanceOf(RegistryStyleNotFoundError)
      if (error instanceof RegistryStyleNotFoundError) {
        expect(error.code).toBe(RegistryErrorCode.STYLE_NOT_FOUND)
        expect(error.statusCode).toBe(404)
        expect(error.style).toBe("new-york-v4")
        expect(error.availableUrl).toContain("styles/new-york-v4/message.json")
        expect(error.message).toContain("new-york-v4")
        expect(error.suggestion).toContain("tailwind.config")
      }
    }
  })

  it("should probe with the headers resolved for the requested item", async () => {
    const url = `${REGISTRY_URL}/styles/new-york/message.json`
    setRegistryHeaders({ [url]: { Authorization: "Bearer token" } })

    let probeAuthorization: string | null = null
    server.use(
      ...mockItem({ style: "new-york", name: "message", status: 404 }),
      http.head(
        `${REGISTRY_URL}/styles/new-york-v4/message.json`,
        ({ request }) => {
          probeAuthorization = request.headers.get("authorization")
          return new HttpResponse(null, { status: 200 })
        },
      ),
    )

    await expect(
      fetchRegistry(["styles/new-york/message.json"], { useCache: false }),
    ).rejects.toBeInstanceOf(RegistryStyleNotFoundError)
    expect(probeAuthorization).toBe("Bearer token")
  })

  it("should throw RegistryNotFoundError when the item is missing from both styles", async () => {
    server.use(
      ...mockItem({ style: "new-york", name: "does-not-exist", status: 404 }),
      mockFallback({ name: "does-not-exist", status: 404 }),
    )

    await expect(
      fetchRegistry(["styles/new-york/does-not-exist.json"], { useCache: false }),
    ).rejects.toBeInstanceOf(RegistryNotFoundError)
  })

  it("should not probe when the 404 is already on the new-york-v4 style", async () => {
    server.use(...mockItem({ style: "new-york-v4", name: "missing", status: 404 }))

    await expect(
      fetchRegistry(["styles/new-york-v4/missing.json"], { useCache: false }),
    ).rejects.toBeInstanceOf(RegistryNotFoundError)
    expect(headRequests()).toHaveLength(0)
  })

  it("should not probe a registry other than the shadcn-vue registry", async () => {
    const url = "https://example.com/r/styles/new-york/message.json"
    server.use(
      http.get(url, () => HttpResponse.json({ error: "Not found" }, { status: 404 })),
    )

    await expect(
      fetchRegistry([url], { useCache: false }),
    ).rejects.toBeInstanceOf(RegistryNotFoundError)
    expect(headRequests()).toHaveLength(0)
  })
})
