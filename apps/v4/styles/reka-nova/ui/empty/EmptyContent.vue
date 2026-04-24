<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="empty-content"
    :class="cn(
      'gap-2.5 text-sm flex w-full max-w-sm min-w-0 flex-col items-center text-balance',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
