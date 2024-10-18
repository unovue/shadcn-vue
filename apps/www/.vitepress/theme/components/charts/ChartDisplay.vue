<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  name: string
}>()
</script>

<template>
  <div
    :class="cn(
      'group relative flex flex-col overflow-hidden rounded-xl border shadow transition-all duration-200 ease-in-out hover:z-30',
      props.class,
    )"
  >
    <ChartToolbar class="relative z-20 flex justify-end border-b bg-card px-3 py-2.5 text-card-foreground" />
    <div class="relative z-10 [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
      <slot />
    </div>
  </div>
</template>
