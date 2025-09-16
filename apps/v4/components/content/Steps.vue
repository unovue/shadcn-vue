<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn(
      '[&>h3]:step steps mb-12 [counter-reset:step] *:[h3]:first:!mt-0', props.class,
    )"
  >
    <slot />
  </div>
</template>
