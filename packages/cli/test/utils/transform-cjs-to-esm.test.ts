import { expect, test } from 'vitest'
import { TAILWIND_CONFIG, TAILWIND_CONFIG_WITH_VARIABLES } from '../../src/utils/templates'
import { transformCJSToESM } from '../../src/utils/transformers/transform-cjs-to-esm'

test('handle tailwind config template correctly', () => {
  expect(transformCJSToESM('.mjs', TAILWIND_CONFIG)).toMatchSnapshot()
  expect(transformCJSToESM('.mjs', TAILWIND_CONFIG_WITH_VARIABLES)).toMatchSnapshot()
})
