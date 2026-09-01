import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest"
import { REGISTRY_URL } from "@/src/registry/constants"
import { clearRegistryCache } from "@/src/registry/fetcher"
import { fetchRegistryItems } from "@/src/registry/resolver"
import { createConfig } from "@/src/utils/get-config"
import { getProjectInfo } from "@/src/utils/get-project-info"

vi.mock("@/src/utils/get-project-info", async importOriginal => ({
  ...(await importOriginal<typeof import("@/src/utils/get-project-info")>()),
  getProjectInfo: vi.fn(),
}))

const server = setupServer()

const requestedUrls: string[] = []

server.events.on("request:start", ({ request }) => {
  requestedUrls.push(request.url)
})

function mockItem(style: string, name: string) {
  return http.get(`${REGISTRY_URL}/styles/${style}/${name}.json`, () =>
    HttpResponse.json({ name, type: "registry:ui", files: [] }))
}

function mockTailwindVersion(tailwindVersion: "v3" | "v4") {
  vi.mocked(getProjectInfo).mockResolvedValue({ tailwindVersion } as any)
}

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
beforeEach(() => {
  clearRegistryCache()
  requestedUrls.length = 0
  vi.mocked(getProjectInfo).mockReset()
})
afterEach(() => server.resetHandlers())
afterAll(() => {
  server.events.removeAllListeners()
  server.close()
})

describe("fetchRegistryItems - style resolution", () => {
  it("should upgrade new-york to new-york-v4 on a tailwind v4 project", async () => {
    // A stale `tailwind.config` keeps components.json on the "new-york" style,
    // but v4-only items are only published under "new-york-v4".
    mockTailwindVersion("v4")
    server.use(mockItem("new-york-v4", "message"))

    const [item] = await fetchRegistryItems(
      ["message"],
      createConfig({
        style: "new-york",
        tailwind: { config: "tailwind.config.js" },
        resolvedPaths: { cwd: "/project" },
      }),
      { useCache: false },
    )

    expect(item.name).toBe("message")
    expect(requestedUrls).toEqual([
      `${REGISTRY_URL}/styles/new-york-v4/message.json`,
    ])
  })

  it("should keep new-york on a tailwind v3 project", async () => {
    mockTailwindVersion("v3")
    server.use(mockItem("new-york", "button"))

    const [item] = await fetchRegistryItems(
      ["button"],
      createConfig({
        style: "new-york",
        tailwind: { config: "tailwind.config.js" },
        resolvedPaths: { cwd: "/project" },
      }),
      { useCache: false },
    )

    expect(item.name).toBe("button")
    expect(requestedUrls).toEqual([
      `${REGISTRY_URL}/styles/new-york/button.json`,
    ])
  })

  it("should pass other styles through untouched", async () => {
    mockTailwindVersion("v4")
    server.use(mockItem("reka-luma", "button"))

    await fetchRegistryItems(
      ["button"],
      createConfig({
        style: "reka-luma",
        resolvedPaths: { cwd: "/project" },
      }),
      { useCache: false },
    )

    expect(requestedUrls).toEqual([
      `${REGISTRY_URL}/styles/reka-luma/button.json`,
    ])
  })

  it("should resolve the style once for a batch of items", async () => {
    mockTailwindVersion("v4")
    server.use(
      mockItem("new-york-v4", "message"),
      mockItem("new-york-v4", "button"),
    )

    await fetchRegistryItems(
      ["message", "button"],
      createConfig({
        style: "new-york",
        resolvedPaths: { cwd: "/project" },
      }),
      { useCache: false },
    )

    expect(vi.mocked(getProjectInfo)).toHaveBeenCalledTimes(1)
  })

  it("should not detect the project for items that carry their own url", async () => {
    const url = "https://example.com/r/button.json"
    server.use(
      http.get(url, () =>
        HttpResponse.json({ name: "button", type: "registry:ui", files: [] })),
    )

    await fetchRegistryItems([url], createConfig({ style: "new-york" }), {
      useCache: false,
    })

    expect(vi.mocked(getProjectInfo)).not.toHaveBeenCalled()
  })
})
