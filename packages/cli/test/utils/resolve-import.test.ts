import path from 'pathe'
import { type ConfigLoaderSuccessResult, loadConfig } from 'tsconfig-paths'
import { expect, it } from 'vitest'

import { resolveImport } from '../../src/utils/resolve-import'

it('resolve import', async () => {
  expect(
    resolveImport('@/foo/bar', {
      absoluteBaseUrl: '/Users/shadcn/Projects/foobar',
      paths: {
        '@/*': ['./src/*'],
        '~/components/*': ['./src/components/*'],
        '~/lib': ['./src/lib'],
      },
    }),
  ).toEqual('/Users/shadcn/Projects/foobar/src/foo/bar')

  expect(
    resolveImport('~/components/foo/bar/baz', {
      absoluteBaseUrl: '/Users/shadcn/Projects/foobar',
      paths: {
        '@/*': ['./src/*'],
        '~/components/*': ['./src/components/*'],
        '~/lib': ['./src/lib'],
      },
    }),
  ).toEqual('/Users/shadcn/Projects/foobar/src/components/foo/bar/baz')

  expect(
    resolveImport('components/foo/bar', {
      absoluteBaseUrl: '/Users/shadcn/Projects/foobar',
      paths: {
        'components/*': ['./src/app/components/*'],
        'ui/*': ['./src/ui/primities/*'],
        'lib': ['./lib'],
      },
    }),
  ).toEqual('/Users/shadcn/Projects/foobar/src/app/components/foo/bar')

  expect(
    resolveImport('lib/utils', {
      absoluteBaseUrl: '/Users/shadcn/Projects/foobar',
      paths: {
        'components/*': ['./src/app/components/*'],
        'ui/*': ['./src/ui/primities/*'],
        'lib': ['./lib'],
      },
    }),
  ).toEqual('/Users/shadcn/Projects/foobar/lib/utils')
})

it('resolve import with base url', async () => {
  const cwd = path.resolve(__dirname, '../fixtures/with-base-url')
  const config = (loadConfig(cwd)) as ConfigLoaderSuccessResult

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
  const config = (loadConfig(cwd)) as ConfigLoaderSuccessResult

  expect(resolveImport('~/components/ui', config)).toEqual(
    path.resolve(cwd, 'components/ui'),
  )
  expect(resolveImport('~/lib/utils', config)).toEqual(
    path.resolve(cwd, 'lib/utils'),
  )
  expect(resolveImport('foo/bar', config)).toEqual(
    path.resolve(cwd, 'foo/bar'),
  )
})
