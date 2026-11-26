<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    data-slot="combobox-item-indicator"
    :class="cn('pointer-events-none absolute right-2 flex size-4 items-center justify-center group-aria-[selected=false]/combobox-item:hidden', props.class)"
  >
    <slot />
  </span>
</template>
