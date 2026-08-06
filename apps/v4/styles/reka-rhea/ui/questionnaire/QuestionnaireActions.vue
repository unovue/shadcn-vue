<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="questionnaire-actions"
    :class="cn(
      'gap-2 sm:min-h-8 grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
