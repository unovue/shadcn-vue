import { resolve } from 'pathe'
import { describe, expect, it } from 'vitest'
import { transform } from '../../src/utils/transformers'

describe('transformSFC', () => {
  it('basic', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      const array: (number | string)[] = [1, 2, 3]
      </script>
      
      <template>
        <div v-bind="{ array }">
          template
        </div>
      </template>
      
      <style scoped>
      </style>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })

  it('remove all type reference', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      const array: (number | string)[] = [1, 2, 3]
      </script>
      
      <template>
        <div v-bind="{ array }" :prop="(a: number) => a" :prop2="(a: number) => {
          let b: number = a
          return b
        }">
          {{ true ? 123 as number : 0 }}
        </div>
      </template>
      
      <style scoped>
      </style>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })

  it('defineProps', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      const props = defineProps<{ foo: string }>()
      </script>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })

  it('defineProps with withDefaults', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      const props = withDefaults(defineProps<{ foo: string }>(), {
        foo: 'bar'
      })
      </script>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })

  it('defineProps with external props', async () => {
    const result = await transform({
      filename: resolve(__dirname, './test.vue'),
      raw: `<script lang="ts" setup>
      import { type Props } from './__fixtures__/props'
      const props = withDefaults(defineProps<{ foo?: string } & Props>(), {
        foo: 'bar'
      })
      </script>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })

  it('defineProps with package props', async () => {
    const result = await transform({
      filename: resolve(__dirname, './test.vue'),
      raw: `<script lang="ts" setup>
      import { type LabelProps } from 'radix-vue'
      const props = withDefaults(defineProps<{ foo?: string } & LabelProps>(), {
        foo: 'bar'
      })
      </script>
      `,
      config: {},
    })
    // TODO: We need to improve this. https://github.com/radix-vue/shadcn-vue/issues/187
    expect(result).toMatchSnapshot()
  })

  it('defineEmits', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      const emit = defineEmits<{ foo: string }>()
      </script>
      `,
      config: {},
    })
    expect(result).toMatchSnapshot()
  })
})
