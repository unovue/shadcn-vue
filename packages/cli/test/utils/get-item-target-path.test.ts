import path from 'node:path'
import { expect, it } from 'vitest'

import { getConfig } from '../../src/utils/get-config'
import { getItemTargetPath } from '../../src/utils/registry'

it('get item target path', async () => {
  // Full config.
  let appDir = path.resolve(__dirname, '../fixtures/config-full')
  expect(
    await getItemTargetPath(await getConfig(appDir), {
      type: 'registry:ui',
    }),
  ).toEqual(path.resolve(appDir, './src/ui'))

  // Partial config.
  appDir = path.resolve(__dirname, '../fixtures/config-partial')
  expect(
    await getItemTargetPath(await getConfig(appDir), {
      type: 'registry:ui',
    }),
  ).toEqual(path.resolve(appDir, './components/ui'))

  // JS.
  appDir = path.resolve(__dirname, '../fixtures/config-js')
  expect(
    await getItemTargetPath(await getConfig(appDir), {
      type: 'registry:ui',
    }),
  ).toEqual(path.resolve(appDir, './components/ui'))

  // Custom paths.
  appDir = path.resolve(__dirname, '../fixtures/config-ui')
  expect(
    await getItemTargetPath(await getConfig(appDir), {
      type: 'registry:ui',
    }),
  ).toEqual(path.resolve(appDir, './src/ui'))
})
