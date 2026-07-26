<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none', props.class)"
  >
    <slot />
  </div>
</template>
