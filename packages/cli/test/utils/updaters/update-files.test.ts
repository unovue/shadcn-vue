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

describe('resolveFilePath alias placeholders', () => {
  const nuxt4 = {
    typescript: true,
    aliases: {
      components: '~/widgets',
      ui: '~/widgets/ui',
      lib: '~/lib',
      composables: '~/composables',
      utils: '~/lib/utils',
    },
    resolvedPaths: {
      cwd: '/project',
      components: '/project/app/widgets',
      ui: '/project/app/widgets/ui',
      lib: '/project/app/lib',
      hooks: '/project/app/hooks',
      composables: '/project/app/composables',
    },
  } as unknown as Config

  it.each([
    ['@components/admin/tabs/index.ts', 'registry:component', '/project/app/widgets/admin/tabs/index.ts'],
    ['@ui/button/Button.vue', 'registry:ui', '/project/app/widgets/ui/button/Button.vue'],
    ['@lib/utils.ts', 'registry:lib', '/project/app/lib/utils.ts'],
    ['@hooks/use-x.ts', 'registry:hook', '/project/app/composables/use-x.ts'],
    ['@composables/use-x.ts', 'registry:composable', '/project/app/composables/use-x.ts'],
  ])('resolves %s against the resolved alias directory', (target, type, expected) => {
    expect(
      resolveFilePath({ path: 'registry/x/file', type, target } as any, nuxt4, { commonRoot: '', isSrcDir: false }),
    ).toBe(expected)
  })

  it('prefers the placeholder over the file type', () => {
    expect(
      resolveFilePath({ path: 'registry/x/ui/helper.ts', type: 'registry:ui', target: '@lib/helper.ts' }, nuxt4, { commonRoot: '' }),
    ).toBe('/project/app/lib/helper.ts')
  })

  it('rejects a placeholder target that escapes its alias root', () => {
    expect(() =>
      resolveFilePath({ path: 'x.ts', type: 'registry:lib', target: '@lib/../nuxt.config.ts' }, nuxt4, { commonRoot: '' }),
    ).toThrow(RegistryValidationError)
  })

  it('resolves @hooks/ against aliases.hooks when it is set', () => {
    const withHooks = { ...nuxt4, aliases: { ...nuxt4.aliases, hooks: '~/hooks' } } as unknown as Config
    expect(
      resolveFilePath({ path: 'x.ts', type: 'registry:hook', target: '@hooks/use-x.ts' }, withHooks, { commonRoot: '' }),
    ).toBe('/project/app/hooks/use-x.ts')
  })

  it('rejects a placeholder whose alias does not resolve', () => {
    const noComposables = { ...nuxt4, resolvedPaths: { ...nuxt4.resolvedPaths, composables: undefined } } as unknown as Config
    expect(() =>
      resolveFilePath({ path: 'x.ts', type: 'registry:composable', target: '@composables/use-x.ts' }, noComposables, { commonRoot: '' }),
    ).toThrow(RegistryValidationError)
  })

  it.each([
    '@lib/',
    '@components//project/app/widgets/x.ts',
    '@components/C:/project/app/widgets/x.ts',
  ])('rejects %s', (target) => {
    expect(() =>
      resolveFilePath({ path: 'x.ts', type: 'registry:lib', target }, nuxt4, { commonRoot: '' }),
    ).toThrow(RegistryValidationError)
  })

  it.each([
    ['@scope/x.ts', '/project/@scope/x.ts'],
    ['@Lib/x.ts', '/project/@Lib/x.ts'],
    ['@components', '/project/@components'],
    ['src/@lib/x.ts', '/project/@lib/x.ts'],
  ])('leaves %s on the existing target path', (target, expected) => {
    expect(
      resolveFilePath({ path: 'x.ts', type: 'registry:file', target }, nuxt4, { commonRoot: '' }),
    ).toBe(expected)
  })
})
