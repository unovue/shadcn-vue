import { describe, expect, test } from 'vitest'
import { transform } from '../../src/utils/transformers'

describe('transformSFC', () => {
  test('basic', async () => {
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

  test('defineProps', async () => {
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

  test('defineProps with withDefaults', async () => {
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

  test('defineEmits', async () => {
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
