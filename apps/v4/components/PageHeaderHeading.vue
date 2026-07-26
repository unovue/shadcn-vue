<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h1
    :class="cn(
      'leading-tighter max-w-3xl text-3xl font-semibold tracking-tight text-balance text-foreground lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter',
      props.class ?? '',
    )"
  >
    <slot />
  </h1>
</template>
