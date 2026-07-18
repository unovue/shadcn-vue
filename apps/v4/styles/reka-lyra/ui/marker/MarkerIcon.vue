<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <span
    data-slot="marker-icon"
    aria-hidden="true"
    :class="cn('size-3.5 [&_svg:not([class*=\'size-\'])]:size-3.5 shrink-0', props.class)"
  >
    <slot />
  </span>
</template>
