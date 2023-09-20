import { expect, test } from 'vitest'

import { transform } from '../../src/utils/transformers'
import stone from '../fixtures/colors/stone.json'

test('transform css vars', async () => {
  expect(
    await transform({
      filename: 'app.vue',
      raw: `<script setup lang="ts"></script>
<template>
<div class="bg-background hover:bg-muted text-primary-foreground sm:focus:text-accent-foreground">foo</div>
</template>"`,
      config: {
        tailwind: {
          baseColor: 'stone',
          cssVariables: true,
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
      },
      baseColor: stone,
    }),
  ).toMatchSnapshot()

  expect(
    await transform({
      filename: 'app.vue',
      raw: `<script setup lang="ts"></script>
<template>
<div class="bg-background hover:bg-muted text-primary-foreground sm:focus:text-accent-foreground">foo</div>
</template>"`,
      config: {
        tailwind: {
          baseColor: 'stone',
          cssVariables: false,
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
      },
      baseColor: stone,
    }),
  ).toMatchSnapshot()

  expect(
    await transform({
      filename: 'app.vue',
      raw: `<script setup lang="ts"></script>
<template>
<div :class="cn('bg-background hover:bg-muted', true && 'text-primary-foreground sm:focus:text-accent-foreground')">foo</div>
</template>"`,
      config: {
        tailwind: {
          baseColor: 'stone',
          cssVariables: false,
        },
        aliases: {
          components: '@/components',
          utils: '@/lib/utils',
        },
      },
      baseColor: stone,
    }),
  ).toMatchSnapshot()
})
