import type { Config } from '../../../src/utils/get-config'
import { describe, expect, it } from 'vitest'

import { RegistryValidationError } from '../../../src/registry/errors'
import {
  resolveFilePath,
  resolveTargetDir,
} from '../../../src/utils/updaters/update-files'

// TODO: `isSrcDir` is not being use yet
describe.todo('resolveTargetDir', () => {
  it('should handle a home target without a src directory', () => {
    const targetDir = resolveTargetDir(
      {
        isSrcDir: false,
      },
      {
        resolvedPaths: {
          cwd: '/foo/bar',
        },
      },
      '~/.env',
    )
    expect(targetDir).toBe('/foo/bar/.env')
  })

  it('should handle a home target even with a src directory', () => {
    const targetDir = resolveTargetDir(
      {
        isSrcDir: true,
      },
      {
        resolvedPaths: {
          cwd: '/foo/bar',
        },
      },
      '~/.env',
    )
    expect(targetDir).toBe('/foo/bar/.env')
  })

  it('should handle a simple target', () => {
    const targetDir = resolveTargetDir(
      {
        isSrcDir: false,
      },
      {
        resolvedPaths: {
          cwd: '/foo/bar',
        },
      },
      './components/ui/button.ts',
    )
    expect(targetDir).toBe('/foo/bar/components/ui/button.ts')
  })

  it('should handle a simple target with src directory', () => {
    const targetDir = resolveTargetDir(
      {
        isSrcDir: true,
      },
      {
        resolvedPaths: {
          cwd: '/foo/bar',
        },
      },
      './components/ui/button.ts',
    )
    expect(targetDir).toBe('/foo/bar/components/ui/button.ts')
  })
})

describe('resolveFilePath containment', () => {
  const config = {
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
      ui: '/project/components/ui',
      lib: '/project/lib',
      components: '/project/components',
      composables: '/project/composables',
    },
  } as unknown as Config

  it('resolves an ordinary target inside the project', () => {
    expect(
      resolveFilePath(
        { path: 'ui/Button.vue', type: 'registry:file', target: 'components/ui/Button.vue' },
        config,
        { commonRoot: '' },
      ),
    ).toBe('/project/components/ui/Button.vue')
  })

  it('resolves a ~/ target against the project root', () => {
    expect(
      resolveFilePath(
        { path: 'env', type: 'registry:file', target: '~/.env.local' },
        config,
        { commonRoot: '' },
      ),
    ).toBe('/project/.env.local')
  })

  it.each([
    '../../../.bashrc',
    '../outside.txt',
    '~/../../.ssh/authorized_keys',
  ])('rejects a target that escapes the project: %s', (target) => {
    expect(() =>
      resolveFilePath(
        { path: 'ui/Button.vue', type: 'registry:file', target },
        config,
        { commonRoot: '' },
      ),
    ).toThrow(RegistryValidationError)
  })

  it('rejects a traversing path when the item declares no target', () => {
    expect(() =>
      resolveFilePath(
        { path: '../../../etc/passwd', type: 'registry:ui' },
        config,
        { commonRoot: '' },
      ),
    ).toThrow(RegistryValidationError)
  })

  it('allows a leading-dots file name that does not actually escape', () => {
    expect(
      resolveFilePath(
        { path: 'x', type: 'registry:file', target: '..config.json' },
        config,
        { commonRoot: '' },
      ),
    ).toBe('/project/..config.json')
  })

  it('does not constrain an explicit --path given by the user', () => {
    expect(
      resolveFilePath(
        { path: 'ui/Button.vue', type: 'registry:file' },
        config,
        { commonRoot: '', path: '/somewhere/else', fileIndex: 0 },
      ),
    ).toBe('/somewhere/else/Button.vue')
  })
})
