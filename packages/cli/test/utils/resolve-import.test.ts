import { getTsconfig } from 'get-tsconfig'
import path from 'pathe'
import { expect, it } from 'vitest'
import { getTSConfig } from '../../src/utils/get-config'
import { resolveImport } from '../../src/utils/resolve-import'

it('resolve import', async () => {
  expect(
    resolveImport('@/foo/bar', {
      config: {
        compilerOptions: {
          baseUrl: '/Users/shadcn/Projects/foobar',
          paths: {
            '@/*': ['./src/*'],
            '~/components/*': ['./src/components/*'],
            '~/lib': ['./src/lib'],
          },
        },
      },
      path: '',
    }),
  ).toEqual('/Users/shadcn/Projects/foobar/src/foo/bar')

  expect(
    resolveImport('~/components/foo/bar/baz', {
      config: {
        compilerOptions: {
          baseUrl: '/Users/shadcn/Projects/foobar',
          paths: {
            '@/*': ['./src/*'],
            '~/components/*': ['./src/components/*'],
            '~/lib': ['./src/lib'],
          },
        },
      },
      path: '',
    }),
  ).toEqual('/Users/shadcn/Projects/foobar/src/components/foo/bar/baz')

  expect(
    resolveImport('components/foo/bar', {
      config: {
        compilerOptions: {
          baseUrl: '/Users/shadcn/Projects/foobar',
          paths: {
            'components/*': ['./src/app/components/*'],
            'ui/*': ['./src/ui/primities/*'],
            'lib': ['./lib'],
          },
        },
      },
      path: '',
    }),
  ).toEqual('/Users/shadcn/Projects/foobar/src/app/components/foo/bar')

  expect(
    resolveImport('lib/utils', {
      config: {
        compilerOptions: {
          baseUrl: '/Users/shadcn/Projects/foobar',
          paths: {
            'components/*': ['./src/app/components/*'],
            'ui/*': ['./src/ui/primities/*'],
            'lib': ['./lib'],
          },
        },
      },
      path: '',
    }),
  ).toEqual('/Users/shadcn/Projects/foobar/lib/utils')
})

it('resolve import with base url', async () => {
  const cwd = path.resolve(__dirname, '../fixtures/with-base-url')
  const config = getTsconfig(cwd)!

  expect(resolveImport('@/components/ui', config)).toEqual(
    path.resolve(cwd, 'components/ui'),
  )
  expect(resolveImport('@/lib/utils', config)).toEqual(
    path.resolve(cwd, 'lib/utils'),
  )
  expect(resolveImport('foo/bar', config)).toEqual(
    path.resolve(cwd, 'foo/bar'),
  )
})

it('resolve import without base url', async () => {
  const cwd = path.resolve(__dirname, '../fixtures/without-base-url')
  const config = getTsconfig(cwd)!

  expect(resolveImport('~/components/ui', config)).toEqual(
    path.resolve(cwd, 'components/ui'),
  )
  expect(resolveImport('~/lib/utils', config)).toEqual(
    path.resolve(cwd, 'lib/utils'),
  )
  // `createPathsMatcher` can't seems to resolve non alias path without baseUrl
  // expect(resolveImport('foo/bar', config)).toEqual(
  //   path.resolve(cwd, 'foo/bar'),
  // )
})

it('resolve import with project references (Nuxt 4 style)', async () => {
  const cwd = path.resolve(__dirname, '../fixtures/nuxt4-broken')
  const config = getTSConfig(cwd, 'tsconfig.json')

  expect(resolveImport('@/components', config)).toEqual(
    path.resolve(cwd, 'components'),
  )
  expect(resolveImport('@/lib/utils', config)).toEqual(
    path.resolve(cwd, 'lib/utils'),
  )
  expect(resolveImport('~/components/ui', config)).toEqual(
    path.resolve(cwd, 'components/ui'),
  )
})
