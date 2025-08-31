import { describe, expect, it } from 'vitest'
import { transform } from '../../src/utils/transformers'

describe('transformIcons', () => {
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
