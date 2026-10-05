import type { Config } from '../../../src/utils/get-config'
import { existsSync, promises as fs } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'pathe'
import { describe, expect, it, vi } from 'vitest'

import { getConfig } from '../../../src/utils/get-config'
import {
  resolveFilePath,
  updateFiles,
} from '../../../src/utils/updaters/update-files'

// Keep the end-to-end test hermetic and offline. `updateFiles` fetches the base color
// and the icon map from the registry; asserting where a file lands does not need either.
vi.mock('../../../src/registry/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../src/registry/api')>()
  return {
    ...actual,
    getRegistryBaseColor: vi.fn(async () => undefined),
    getRegistryIcons: vi.fn(async () => ({})),
  }
})

// A project that keeps its source under `src/` (a plain Vite + Vue project, or a Nuxt
// project configured with a `src/` directory). `getProjectInfo()` reports this layout as
// `isSrcDir: true`.
const srcDirConfig = {
  typescript: true,
  aliases: {
    components: '@/components',
    ui: '@/components/ui',
    lib: '@/lib',
    composables: '@/composables',
    utils: '@/lib/utils',
  },
  resolvedPaths: {
    cwd: '/project',
    ui: '/project/src/components/ui',
    lib: '/project/src/lib',
    components: '/project/src/components',
    composables: '/project/src/composables',
  },
} as unknown as Config

// A registry item file that declares an explicit `target` must land inside the project
// source directory, not at the project root.
describe('resolveFilePath with a target in a srcDir project', () => {
  it('places a target inside src/ when the project uses a src directory', () => {
    expect(
      resolveFilePath(
        {
          path: 'ui/foo/Foo.vue',
          type: 'registry:file',
          target: 'components/ui/foo/Foo.vue',
        },
        srcDirConfig,
        { commonRoot: '', isSrcDir: true },
      ),
    ).toBe('/project/src/components/ui/foo/Foo.vue')
  })

  it('does not double up when the target already starts with src/', () => {
    expect(
      resolveFilePath(
        {
          path: 'ui/foo/Foo.vue',
          type: 'registry:file',
          target: 'src/components/ui/foo/Foo.vue',
        },
        srcDirConfig,
        { commonRoot: '', isSrcDir: true },
      ),
    ).toBe('/project/src/components/ui/foo/Foo.vue')
  })

  it('keeps placing a target at the project root when there is no src directory', () => {
    expect(
      resolveFilePath(
        {
          path: 'ui/foo/Foo.vue',
          type: 'registry:file',
          target: 'components/ui/foo/Foo.vue',
        },
        srcDirConfig,
        { commonRoot: '', isSrcDir: false },
      ),
    ).toBe('/project/components/ui/foo/Foo.vue')
  })

  it('keeps a home-relative target anchored to the project root', () => {
    expect(
      resolveFilePath(
        { path: 'env', type: 'registry:file', target: '~/.env.local' },
        srcDirConfig,
        { commonRoot: '', isSrcDir: true },
      ),
    ).toBe('/project/.env.local')
  })
})

// End-to-end: drive the real code path (`updateFiles` -> `getProjectInfo` -> `resolveFilePath`)
// against a throwaway project that keeps its source under `src/`.
it('writes a target-declaring registry file into src/ through updateFiles', async () => {
  const cwd = await fs.mkdtemp(path.join(tmpdir(), 'shadcn-srcdir-'))

  try {
    await fs.mkdir(path.join(cwd, 'src'), { recursive: true })
    await fs.writeFile(
      path.join(cwd, 'components.json'),
      JSON.stringify({
        style: 'default',
        typescript: true,
        tailwind: { config: 'tailwind.config.ts', css: 'src/index.css', baseColor: 'neutral', cssVariables: true },
        aliases: {
          utils: '@/lib/utils',
          components: '@/components',
          ui: '@/components/ui',
          lib: '@/lib',
          composables: '@/composables',
        },
      }),
    )
    await fs.writeFile(
      path.join(cwd, 'package.json'),
      JSON.stringify({ name: 'tmp-srcdir-project', dependencies: { vue: '^3.5.0' } }),
    )
    await fs.writeFile(
      path.join(cwd, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: { baseUrl: '.', paths: { '@/*': ['./src/*'] } },
      }),
    )

    const config = await getConfig(cwd)
    expect(config).toBeTruthy()

    const result = await updateFiles(
      [
        {
          path: 'ui/foo/Foo.vue',
          type: 'registry:file',
          target: 'components/ui/foo/Foo.vue',
          content: '<template><div>foo</div></template>\n',
        },
      ],
      config!,
      { silent: true },
    )

    expect(result.filesCreated).toEqual(['src/components/ui/foo/Foo.vue'])
    expect(existsSync(path.join(cwd, 'src/components/ui/foo/Foo.vue'))).toBe(true)
    // The bug wrote this instead, at the project root.
    expect(existsSync(path.join(cwd, 'components/ui/foo/Foo.vue'))).toBe(false)
  }
  finally {
    await fs.rm(cwd, { recursive: true, force: true })
  }
})
