import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { x } from "tinyexec"
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest"
import {
  RegistryItemNotFoundError,
  RegistrySourceFileError,
  RegistryValidationError,
} from "@/src/registry/errors"

import {
  clearGitHubSourceCache,
  fetchGitHubRegistryCatalog,
  fetchGitHubRegistryItem,
} from "./github"

vi.mock("tinyexec", () => ({
  x: vi.fn(),
}))

const SHA = "1111111111111111111111111111111111111111"
const RAW = "https://raw.githubusercontent.com"

const server = setupServer()

function rawUrl(filePath: string, sha = SHA) {
  return `${RAW}/acme/ui/${sha}/${filePath}`
}

function mockFiles(files: Record<string, string>, sha = SHA) {
  server.use(
    ...Object.entries(files).map(([filePath, body]) =>
      http.get(rawUrl(filePath, sha), () => HttpResponse.text(body)),
    ),
    http.get(`${RAW}/acme/ui/${sha}/*`, () =>
      HttpResponse.text("Not Found", { status: 404 })),
  )
}

function registryJson(items: unknown[]) {
  return JSON.stringify({
    name: "acme",
    homepage: "https://acme.com",
    items,
  })
}

const BUTTON_ITEM = {
  name: "button",
  type: "registry:ui",
  files: [
    {
      path: "registry/ui/Button.vue",
      type: "registry:ui",
      target: "components/ui/Button.vue",
    },
  ],
}

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))

beforeEach(() => {
  clearGitHubSourceCache()
  vi.mocked(x).mockReset()
  vi.mocked(x).mockResolvedValue({ stdout: `${SHA}\tHEAD` } as any)
})

afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("fetchGitHubRegistryItem", () => {
  it("resolves an item from the root registry.json and inlines file content", async () => {
    mockFiles({
      "registry.json": registryJson([BUTTON_ITEM]),
      "registry/ui/Button.vue": "<template><button /></template>",
    })

    const item = await fetchGitHubRegistryItem({
      scheme: "github",
      owner: "acme",
      repo: "ui",
      item: "button",
    })

    expect(item).toMatchObject({
      name: "button",
      type: "registry:ui",
      files: [
        {
          path: "registry/ui/Button.vue",
          target: "components/ui/Button.vue",
          content: "<template><button /></template>",
        },
      ],
    })
  })

  it("resolves an item name that contains a slash", async () => {
    mockFiles({
      "registry.json": registryJson([
        { ...BUTTON_ITEM, name: "forms/login" },
      ]),
      "registry/ui/Button.vue": "<template><button /></template>",
    })

    const item = await fetchGitHubRegistryItem({
      scheme: "github",
      owner: "acme",
      repo: "ui",
      item: "forms/login",
    })

    expect(item.name).toBe("forms/login")
  })

  it("pins every file of an item to the resolved commit", async () => {
    const tagSha = "2222222222222222222222222222222222222222"
    vi.mocked(x).mockResolvedValue({
      stdout: `${tagSha}\trefs/tags/v1.0.0^{}`,
    } as any)
    mockFiles(
      {
        "registry.json": registryJson([BUTTON_ITEM]),
        "registry/ui/Button.vue": "pinned",
      },
      tagSha,
    )

    const item = await fetchGitHubRegistryItem({
      scheme: "github",
      owner: "acme",
      repo: "ui",
      item: "button",
      ref: "v1.0.0",
    })

    expect(item.files?.[0].content).toBe("pinned")
  })

  it("passes absolute registryDependencies through untouched", async () => {
    mockFiles({
      "registry.json": registryJson([
        {
          ...BUTTON_ITEM,
          registryDependencies: [
            "https://lifeline-peter-lewis.vercel.app/r/lifeline.json",
          ],
        },
      ]),
      "registry/ui/Button.vue": "<template><button /></template>",
    })

    const item = await fetchGitHubRegistryItem({
      scheme: "github",
      owner: "acme",
      repo: "ui",
      item: "button",
    })

    expect(item.registryDependencies).toEqual([
      "https://lifeline-peter-lewis.vercel.app/r/lifeline.json",
    ])
  })

  it("explains a missing root registry.json rather than surfacing a bare 404", async () => {
    server.use(
      http.get(`${RAW}/acme/ui/${SHA}/*`, () =>
        HttpResponse.text("404: Not Found", { status: 404 })),
    )

    await expect(
      fetchGitHubRegistryItem({
        scheme: "github",
        owner: "acme",
        repo: "ui",
        item: "button",
      }),
    ).rejects.toMatchObject({
      suggestion: expect.stringContaining("the repository is public"),
    })
  })

  it("reports a missing item name against the registry it read", async () => {
    mockFiles({ "registry.json": registryJson([BUTTON_ITEM]) })

    await expect(
      fetchGitHubRegistryItem({
        scheme: "github",
        owner: "acme",
        repo: "ui",
        item: "calendar",
      }),
    ).rejects.toThrow(RegistryItemNotFoundError)
  })

  it("reports a file that the registry declares but the repository lacks", async () => {
    mockFiles({ "registry.json": registryJson([BUTTON_ITEM]) })

    await expect(
      fetchGitHubRegistryItem({
        scheme: "github",
        owner: "acme",
        repo: "ui",
        item: "button",
      }),
    ).rejects.toThrow(RegistrySourceFileError)
  })

  it.each([
    ["../../../etc/passwd", "file paths cannot use parent-directory traversal"],
    ["/etc/passwd", "file paths must be relative"],
  ])("rejects a traversing file path %s", async (path, message) => {
    mockFiles({
      "registry.json": registryJson([
        { ...BUTTON_ITEM, files: [{ path, type: "registry:ui" }] },
      ]),
    })

    await expect(
      fetchGitHubRegistryItem({
        scheme: "github",
        owner: "acme",
        repo: "ui",
        item: "button",
      }),
    ).rejects.toThrow(message)
  })

  it.each([
    "../../.ssh/authorized_keys",
    "/etc/passwd",
    "~/../../.bashrc",
  ])("rejects a file target that writes outside the project: %s", async (target) => {
    mockFiles({
      "registry.json": registryJson([
        {
          ...BUTTON_ITEM,
          files: [
            { path: "registry/ui/Button.vue", type: "registry:file", target },
          ],
        },
      ]),
      "registry/ui/Button.vue": "<template><button /></template>",
    })

    await expect(
      fetchGitHubRegistryItem({
        scheme: "github",
        owner: "acme",
        repo: "ui",
        item: "button",
      }),
    ).rejects.toThrow(RegistryValidationError)
  })

  it("allows a ~/ target", async () => {
    mockFiles({
      "registry.json": registryJson([
        {
          ...BUTTON_ITEM,
          files: [
            {
              path: "registry/ui/Button.vue",
              type: "registry:file",
              target: "~/components/ui/Button.vue",
            },
          ],
        },
      ]),
      "registry/ui/Button.vue": "<template><button /></template>",
    })

    const item = await fetchGitHubRegistryItem({
      scheme: "github",
      owner: "acme",
      repo: "ui",
      item: "button",
    })

    expect(item.files?.[0].target).toBe("~/components/ui/Button.vue")
  })

  it("rejects a duplicate of the item that was asked for", async () => {
    mockFiles({
      "registry.json": registryJson([BUTTON_ITEM, BUTTON_ITEM]),
    })

    await expect(
      fetchGitHubRegistryItem({
        scheme: "github",
        owner: "acme",
        repo: "ui",
        item: "button",
      }),
    ).rejects.toThrow("Duplicate registry item name \"button\"")
  })

  it("ignores a duplicate of some other item", async () => {
    mockFiles({
      "registry.json": registryJson([
        BUTTON_ITEM,
        { ...BUTTON_ITEM, name: "card" },
        { ...BUTTON_ITEM, name: "card" },
      ]),
      "registry/ui/Button.vue": "<template><button /></template>",
    })

    const item = await fetchGitHubRegistryItem({
      scheme: "github",
      owner: "acme",
      repo: "ui",
      item: "button",
    })

    expect(item.name).toBe("button")
  })

  it("ignores a malformed file path on some other item", async () => {
    mockFiles({
      "registry.json": registryJson([
        BUTTON_ITEM,
        {
          ...BUTTON_ITEM,
          name: "evil",
          files: [{ path: "../../../etc/passwd", type: "registry:ui" }],
        },
      ]),
      "registry/ui/Button.vue": "<template><button /></template>",
    })

    // One bad item must not make the whole repository uninstallable.
    const item = await fetchGitHubRegistryItem({
      scheme: "github",
      owner: "acme",
      repo: "ui",
      item: "button",
    })

    expect(item.name).toBe("button")
  })

  it("reuses a fetched file even when useCache is false", async () => {
    let attempt = 0
    server.use(
      http.get(rawUrl("registry.json"), () =>
        HttpResponse.text(registryJson([BUTTON_ITEM]))),
      http.get(rawUrl("registry/ui/Button.vue"), () => {
        attempt++
        return HttpResponse.text("<template><button /></template>")
      }),
    )

    const address = {
      scheme: "github",
      owner: "acme",
      repo: "ui",
      item: "button",
    } as const

    // The raw url is pinned to a resolved commit sha, so its body cannot go
    // stale and `useCache: false` has nothing to invalidate. Namespace
    // discovery loads every item once before the install does, so refetching
    // here would double the request count against raw.githubusercontent.com.
    await fetchGitHubRegistryItem(address, { useCache: false })
    await fetchGitHubRegistryItem(address, { useCache: false })

    expect(attempt).toBe(1)
  })

  it("does not cache a failed file read", async () => {
    let attempt = 0
    server.use(
      http.get(rawUrl("registry.json"), () =>
        HttpResponse.text(registryJson([BUTTON_ITEM]))),
      http.get(rawUrl("registry/ui/Button.vue"), () => {
        attempt++
        // 404 rather than 5xx: ofetch retries retryStatusCodes on GET, which
        // would paper over the first failure before the cache ever saw it.
        return attempt === 1
          ? HttpResponse.text("404: Not Found", { status: 404 })
          : HttpResponse.text("<template><button /></template>")
      }),
    )

    const address = {
      scheme: "github",
      owner: "acme",
      repo: "ui",
      item: "button",
    } as const

    // A transient failure must not be replayed for the rest of the run.
    await expect(fetchGitHubRegistryItem(address)).rejects.toThrow(
      RegistrySourceFileError,
    )

    const item = await fetchGitHubRegistryItem(address)
    expect(item.files?.[0].content).toBe("<template><button /></template>")
    expect(attempt).toBe(2)
  })

  it("resolves the ref once per repository across items", async () => {
    mockFiles({
      "registry.json": registryJson([
        BUTTON_ITEM,
        { ...BUTTON_ITEM, name: "card" },
      ]),
      "registry/ui/Button.vue": "<template><button /></template>",
    })

    await fetchGitHubRegistryItem({
      scheme: "github",
      owner: "acme",
      repo: "ui",
      item: "button",
    })
    await fetchGitHubRegistryItem({
      scheme: "github",
      owner: "acme",
      repo: "ui",
      item: "card",
    })

    expect(vi.mocked(x)).toHaveBeenCalledTimes(1)
  })
})

describe("fetchGitHubRegistryCatalog", () => {
  it("lists the items a repository publishes without file content", async () => {
    mockFiles({
      "registry.json": registryJson([
        BUTTON_ITEM,
        { ...BUTTON_ITEM, name: "card" },
      ]),
    })

    const registry = await fetchGitHubRegistryCatalog({
      owner: "acme",
      repo: "ui",
    })

    expect(registry.name).toBe("acme")
    expect(registry.items.map(item => item.name)).toEqual(["button", "card"])
    expect(registry.items[0].files?.[0]).not.toHaveProperty("content")
  })
})
