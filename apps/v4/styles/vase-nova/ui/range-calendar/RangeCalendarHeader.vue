<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="range-calendar-header"
    :class="cn('flex justify-center pt-1 relative items-center w-full', props.class)"
  >
    <slot />
  </div>
</template>
