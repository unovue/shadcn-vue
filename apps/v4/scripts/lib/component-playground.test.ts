import assert from 'node:assert/strict'
import { it } from 'vitest'
import { getComponentPlaygroundUrl } from '../../lib/component-playground'

it('opens the selected source file from the upstream dev branch', () => {
  const url = new URL(getComponentPlaygroundUrl('apps/v4/components/demo/AccordionDemo.vue'))

  assert.equal(url.origin, 'https://stackblitz.com')
  assert.equal(url.pathname, '/github/unovue/shadcn-vue/tree/dev')
  assert.equal(url.searchParams.get('file'), 'apps/v4/components/demo/AccordionDemo.vue')
  assert.equal(url.searchParams.get('startScript'), 'dev')
})
