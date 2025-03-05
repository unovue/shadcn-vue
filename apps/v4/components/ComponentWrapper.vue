<script setup lang="ts">
const props = defineProps<{
  name: string
  class?: HTMLAttributes['class']
}>()

import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const hasError = ref(false)
onErrorCaptured(() => {
  hasError.value = true
})

function getComponentName(name: string) {
  // convert kebab-case to title case
  return name.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
}
</script>

<template>
  <Suspense>
    <div
      v-if="!hasError"
      :id="name"
      :data-name="name.toLowerCase()"
      :class="cn(
        'flex w-full scroll-mt-16 flex-col rounded-lg border',
        props.class,
      )"
      v-bind="$attrs"
    >
      <div class="border-b px-4 py-3">
        <div class="text-sm font-medium">
          {{ getComponentName(name) }}
        </div>
      </div>
      <div class="flex flex-1 items-center gap-2 p-4">
        <slot />
      </div>
    </div>

    <div v-else class="p-4 text-red-500">
      Something went wrong in component: {{ name }}
    </div>
  </Suspense>
</template>
