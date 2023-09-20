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
})
