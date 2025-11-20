<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div class="no-scrollbar my-6 w-full overflow-y-auto rounded-lg border">
    <table
      :class="cn(
        'relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0',
        props.class,
      )"
      v-bind="$attrs"
    >
      <slot />
    </table>
  </div>
</template>
