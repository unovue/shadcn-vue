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

  it('remove all type reference, keeping similar template', async () => {
    const result = await transform({
      filename: 'app.vue',
      raw: `<script lang="ts" setup>
      const array: (number | string)[] = [1, 2, 3]
      </script>
      
      <template>
        <div :class="cn(
        'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper'
          && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        props.class,
      )
      ">
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
