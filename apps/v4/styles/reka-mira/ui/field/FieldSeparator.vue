<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { Separator } from '@/styles/reka-mira/ui/separator'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    data-slot="field-separator"
    :data-content="!!$slots.default"
    :class="cn(
      '-my-2 h-5 text-xs/relaxed group-data-[variant=outline]/field-group:-mb-2 relative',
      props.class,
    )"
  >
    <Separator class="absolute inset-0 top-1/2" />
    <span
      v-if="$slots.default"
      class="text-muted-foreground px-2 relative mx-auto block w-fit bg-background"
      data-slot="field-separator-content"
    >
      <slot />
    </span>
  </div>
</template>
