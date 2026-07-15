<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="empty-header"
    :class="cn(
      'gap-2 flex max-w-sm flex-col items-center',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
