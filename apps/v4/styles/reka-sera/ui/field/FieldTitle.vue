<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="field-label"
    :class="cn(
      'gap-2 group-data-[disabled=true]/field:opacity-50 font-semibold uppercase in-data-[slot=field-label]:font-semibold text-xs flex w-fit items-center leading-snug',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
