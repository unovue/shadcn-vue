import { x } from "tinyexec"
import { beforeEach, describe, expect, it, vi } from "vitest"

import {
  getPreferredGitHubRefNames,
  parseGitLsRemote,
  resolveGitHubRef,
} from "./github-ref"

vi.mock("tinyexec", () => ({
  x: vi.fn(),
}))

describe("gitHub ref resolution", () => {
  beforeEach(() => {
    vi.mocked(x).mockReset()
  })

  it("resolves HEAD through git ls-remote", async () => {
    vi.mocked(x).mockResolvedValueOnce({
      stdout: [
        "ref: refs/heads/main\tHEAD",
        "1111111111111111111111111111111111111111\tHEAD",
      ].join("\n"),
    } as any)

    await expect(resolveGitHubRef({ owner: "acme", repo: "ui" })).resolves.toBe(
      "1111111111111111111111111111111111111111",
    )
    expect(vi.mocked(x)).toHaveBeenCalledWith(
      "git",
      ["ls-remote", "--symref", "--", "https://github.com/acme/ui.git", "HEAD"],
      expect.objectContaining({ throwOnError: true }),
    )
  })

  it("never assumes the default branch is main", async () => {
    vi.mocked(x).mockResolvedValueOnce({
      stdout: [
        "ref: refs/heads/master\tHEAD",
        "3333333333333333333333333333333333333333\tHEAD",
      ].join("\n"),
    } as any)

    await expect(resolveGitHubRef({ owner: "acme", repo: "ui" })).resolves.toBe(
      "3333333333333333333333333333333333333333",
    )
  })

  it("disables the interactive git credential prompt", async () => {
    vi.mocked(x).mockResolvedValueOnce({
      stdout: "1111111111111111111111111111111111111111\tHEAD",
    } as any)

    await resolveGitHubRef({ owner: "acme", repo: "ui" })

    expect(vi.mocked(x).mock.calls[0][2]).toMatchObject({
      nodeOptions: {
        env: expect.objectContaining({ GIT_TERMINAL_PROMPT: "0" }),
      },
    })
  })

  it("uses a full commit SHA without calling git", async () => {
    await expect(
      resolveGitHubRef({
        owner: "acme",
        repo: "ui",
        ref: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      }),
    ).resolves.toBe("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    expect(vi.mocked(x)).not.toHaveBeenCalled()
  })

  it("prefers branch names before tag names for shorthand refs", () => {
    expect(getPreferredGitHubRefNames("main")).toEqual([
      "refs/heads/main",
      "refs/tags/main^{}",
      "refs/tags/main",
      "main",
    ])
  })

  it("prefers peeled annotated tags over tag objects", async () => {
    vi.mocked(x).mockResolvedValueOnce({
      stdout: [
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\trefs/tags/v1.0.0",
        "2222222222222222222222222222222222222222\trefs/tags/v1.0.0^{}",
      ].join("\n"),
    } as any)

    await expect(
      resolveGitHubRef({ owner: "acme", repo: "ui", ref: "v1.0.0" }),
    ).resolves.toBe("2222222222222222222222222222222222222222")
  })

  it("treats short SHAs as refs", async () => {
    vi.mocked(x).mockResolvedValueOnce({ stdout: "" } as any)

    await expect(
      resolveGitHubRef({ owner: "acme", repo: "ui", ref: "abc1234" }),
    ).rejects.toThrow("Could not resolve GitHub ref \"abc1234\"")
    expect(vi.mocked(x)).toHaveBeenCalledWith(
      "git",
      [
        "ls-remote",
        "--symref",
        "--",
        "https://github.com/acme/ui.git",
        "refs/heads/abc1234",
        "refs/tags/abc1234^{}",
        "refs/tags/abc1234",
        "abc1234",
      ],
      expect.any(Object),
    )
  })

  it("reuses the command-local ref cache", async () => {
    const cache = new Map<string, Promise<string>>()
    vi.mocked(x).mockResolvedValueOnce({
      stdout: "1111111111111111111111111111111111111111\tHEAD",
    } as any)

    await resolveGitHubRef({ owner: "acme", repo: "ui" }, { cache })
    await resolveGitHubRef({ owner: "acme", repo: "ui" }, { cache })

    expect(vi.mocked(x)).toHaveBeenCalledTimes(1)
  })

  it("removes failed ref resolutions from the command-local cache", async () => {
    const cache = new Map<string, Promise<string>>()
    vi.mocked(x)
      .mockRejectedValueOnce(new Error("exited with code 128"))
      .mockResolvedValueOnce({
        stdout: "1111111111111111111111111111111111111111\tHEAD",
      } as any)

    await expect(
      resolveGitHubRef({ owner: "acme", repo: "ui" }, { cache }),
    ).rejects.toThrow("Failed to resolve GitHub ref \"HEAD\"")
    await expect(
      resolveGitHubRef({ owner: "acme", repo: "ui" }, { cache }),
    ).resolves.toBe("1111111111111111111111111111111111111111")

    expect(vi.mocked(x)).toHaveBeenCalledTimes(2)
  })

  it("returns a clear missing git suggestion", async () => {
    vi.mocked(x).mockRejectedValueOnce(
      Object.assign(new Error("spawn git ENOENT"), { code: "ENOENT" }),
    )

    await expect(
      resolveGitHubRef({ owner: "acme", repo: "ui" }),
    ).rejects.toMatchObject({
      suggestion:
        "Install Git and try again. Git is required to resolve GitHub registry refs.",
    })
  })

  it("aborts and reports a timeout when git ls-remote stalls", async () => {
    vi.useFakeTimers()
    try {
      let signal: AbortSignal | undefined
      vi.mocked(x).mockImplementationOnce(
        (_command, _args, options: any) =>
          new Promise((_resolve, reject) => {
            signal = options?.signal
            signal?.addEventListener("abort", () =>
              reject(new Error("aborted")))
          }) as any,
      )

      const promise = resolveGitHubRef({ owner: "acme", repo: "ui" })
      const assertion = expect(promise).rejects.toMatchObject({
        suggestion:
          "GitHub ref resolution timed out. Check your network connection and try again.",
      })

      await vi.advanceTimersByTimeAsync(15_000)
      await assertion

      expect(signal?.aborted).toBe(true)
    }
    finally {
      vi.useRealTimers()
    }
  })

  it("points at the public-repository requirement when git fails", async () => {
    vi.mocked(x).mockRejectedValueOnce(new Error("exited with code 128"))

    await expect(
      resolveGitHubRef({ owner: "acme", repo: "private" }),
    ).rejects.toMatchObject({
      suggestion: expect.stringContaining(
        "Check that the public GitHub repository exists and the ref is accessible. Private repositories are not supported.",
      ),
    })
  })

  it("points at the @namespace form when a repository lookup fails", async () => {
    vi.mocked(x).mockRejectedValueOnce(new Error("exited with code 128"))

    await expect(
      resolveGitHubRef({ owner: "acme", repo: "registry" }),
    ).rejects.toMatchObject({
      suggestion: expect.stringContaining("prefix it with \"@\""),
    })
  })
})

describe("gitHub ls-remote parsing", () => {
  it("parses advertised refs and skips symref lines", () => {
    const refs = parseGitLsRemote(
      [
        "ref: refs/heads/main\tHEAD",
        "1111111111111111111111111111111111111111\tHEAD",
        "2222222222222222222222222222222222222222\trefs/heads/main",
      ].join("\n"),
    )

    expect(Object.fromEntries(refs)).toEqual({
      "HEAD": "1111111111111111111111111111111111111111",
      "refs/heads/main": "2222222222222222222222222222222222222222",
    })
  })

  it("asks for a fully qualified ref exactly as given", () => {
    expect(getPreferredGitHubRefNames("refs/heads/main")).toEqual([
      "refs/heads/main",
    ])
  })

  it("never produces duplicate candidates", () => {
    for (const ref of ["HEAD", "main", "refs/heads/main", "refs/tags/v1"]) {
      const candidates = getPreferredGitHubRefNames(ref)
      expect(new Set(candidates).size).toBe(candidates.length)
    }
  })
})
