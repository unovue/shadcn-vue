import { describe, expect, it } from 'vitest'
import { transform as metaTransform } from 'vue-metamorph'
import { transform } from '../../src/utils/transformers'
import { transformIcons } from '../../src/utils/transformers/transform-icons'

describe('transformIcons', () => {
  it('transforms phosphor icons', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      import { Check } from 'lucide-vue-next'
      import { Primitive } from 'reka-ui'
      </script>

      <template>
        <Check />
        <Primitive />
      </template>
      `,
      config: {
        iconLibrary: 'phosphor',
      },
    })
    expect(result).toMatchSnapshot()
  })

  it('transforms tabler icons', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      import { Check } from 'lucide-vue-next'
      import { Primitive } from 'reka-ui'
      </script>

      <template>
        <Check />
        <Primitive />
      </template>
      `,
      config: {
        iconLibrary: 'tabler',
      },
    })
    expect(result).toMatchSnapshot()
  })

  it('transforms radix icons', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      import { Check } from 'lucide-vue-next'
      import { Primitive } from 'reka-ui'
      </script>

      <template>
        <Check />
        <Primitive />
      </template>
      `,
      config: {
        iconLibrary: 'radix',
      },
    })
    expect(result).toMatchSnapshot()
  })

  it('does not transform lucide icons', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      import { Check } from 'lucide-vue-next'
      import { Primitive } from 'reka-ui'
      </script>

      <template>
        <Check />
        <Primitive />
      </template>
      `,
      config: {
        iconLibrary: 'lucide',
      },
    })
    expect(result).toMatchSnapshot()
  })

  it('transforms icons with Icon suffix via fallback', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      import { CheckIcon } from 'lucide-vue-next'
      import { Primitive } from 'reka-ui'
      </script>

      <template>
        <CheckIcon />
        <Primitive />
      </template>
      `,
      config: {
        iconLibrary: 'phosphor',
      },
    })
    expect(result).toContain('@phosphor-icons/vue')
    expect(result).toContain('PhCheck')
    expect(result).not.toContain('lucide-vue-next')
    expect(result).not.toContain('CheckIcon')
  })

  it('transforms remixicon icons with Icon suffix via fallback', async () => {
    const registryIcons = {
      Check: { remixicon: 'RiCheckLine' },
      ChevronDown: { remixicon: 'RiArrowDownSLine' },
    }
    const source = `<script lang="ts" setup>
import { CheckIcon, ChevronDownIcon } from 'lucide-vue-next'
import { Primitive } from 'reka-ui'
</script>

<template>
  <CheckIcon />
  <ChevronDownIcon />
  <Primitive />
</template>
`
    const result = metaTransform(source, 'app.vue', [
      transformIcons(
        { filename: 'app.vue', raw: source, config: { iconLibrary: 'remixicon' } },
        registryIcons,
      ),
    ]).code

    expect(result).toContain('@remixicon/vue')
    expect(result).toContain('RiCheckLine')
    expect(result).toContain('RiArrowDownSLine')
    expect(result).not.toContain('lucide-vue-next')
    expect(result).not.toContain('CheckIcon')
    expect(result).not.toContain('ChevronDownIcon')
  })

  it('does nothing', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      import { Check } from 'lucide-vue-next'
      import { Primitive } from 'reka-ui'
      </script>

      <template>
        <Check />
        <Primitive />
      </template>
      `,
      config: {
        style: 'new-york',
        tailwind: {
          config: 'tailwind.config.js',
          css: 'src/assets/index.css',
          baseColor: 'zinc',
          cssVariables: true,
        },
        aliases: {
          utils: '@/utils',
          components: '@/components',
        },
      },
    })
    expect(result).toMatchSnapshot()
  })
})
