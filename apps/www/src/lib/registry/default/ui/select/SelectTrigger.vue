<script setup lang="ts">
import { SelectTrigger, type SelectTriggerProps } from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<SelectTriggerProps & { class?: string; invalid?: boolean }>(),
  {
    class: '',
    invalid: false,
  },
)
</script>

<template>
  <SelectTrigger
    v-bind="props"
    :class="[
      cn(
        'flex h-9 w-full text-foreground hover:bg-outline-hover transition-colors ease-in-out duration-300 items-center justify-between rounded-md border shadow-sm border-border bg-transparent px-3 py-2 text-sm placeholder:text-muted focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      ),
      props.invalid
        ? '!ring-destructive ring-2 placeholder:!text-destructive'
        : '',
    ]"
  >
    <slot />
    <ChevronDown class="w-4 h-4 opacity-50" />
  </SelectTrigger>
</template>
