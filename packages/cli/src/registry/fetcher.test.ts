import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest"
import { REGISTRY_URL } from "@/src/registry/constants"
import {
  RegistryErrorCode,
  RegistryNotFoundError,
  RegistryStyleNotFoundError,
} from "@/src/registry/errors"
import { clearRegistryCache, fetchRegistry } from "./fetcher"

const server = setupServer()

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
beforeEach(() => clearRegistryCache())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("fetchRegistry - tailwind v4 style fallback", () => {
  it("should throw RegistryStyleNotFoundError when the item only exists for new-york-v4", async () => {
    server.use(
      http.get(`${REGISTRY_URL}/styles/new-york/message.json`, () => {
        return HttpResponse.json({ error: "Not found" }, { status: 404 })
      }),
      http.head(`${REGISTRY_URL}/styles/new-york-v4/message.json`, () => {
        return new HttpResponse(null, { status: 200 })
      }),
    )

    await expect(
      fetchRegistry(["styles/new-york/message.json"], { useCache: false }),
    ).rejects.toBeInstanceOf(RegistryStyleNotFoundError)
  })

  it("should expose the v4 url and style on the error", async () => {
    server.use(
      http.get(`${REGISTRY_URL}/styles/new-york/message.json`, () => {
        return HttpResponse.json({ error: "Not found" }, { status: 404 })
      }),
      http.head(`${REGISTRY_URL}/styles/new-york-v4/message.json`, () => {
        return new HttpResponse(null, { status: 200 })
      }),
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

  it("should throw RegistryNotFoundError when the item is missing from both styles", async () => {
    server.use(
      http.get(`${REGISTRY_URL}/styles/new-york/does-not-exist.json`, () => {
        return HttpResponse.json({ error: "Not found" }, { status: 404 })
      }),
      http.head(`${REGISTRY_URL}/styles/new-york-v4/does-not-exist.json`, () => {
        return new HttpResponse(null, { status: 404 })
      }),
    )

    await expect(
      fetchRegistry(["styles/new-york/does-not-exist.json"], { useCache: false }),
    ).rejects.toBeInstanceOf(RegistryNotFoundError)
  })

  it("should not probe when the 404 is already on the new-york-v4 style", async () => {
    server.use(
      http.get(`${REGISTRY_URL}/styles/new-york-v4/missing.json`, () => {
        return HttpResponse.json({ error: "Not found" }, { status: 404 })
      }),
    )

    // onUnhandledRequest: "error" makes this fail if a fallback probe fires.
    await expect(
      fetchRegistry(["styles/new-york-v4/missing.json"], { useCache: false }),
    ).rejects.toBeInstanceOf(RegistryNotFoundError)
  })
})
