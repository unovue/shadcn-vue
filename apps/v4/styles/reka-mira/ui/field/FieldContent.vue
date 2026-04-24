<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="field-content"
    :class="cn(
      'gap-0.5 group/field-content flex flex-1 flex-col leading-snug',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
