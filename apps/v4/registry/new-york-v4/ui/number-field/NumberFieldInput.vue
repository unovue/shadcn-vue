<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"
import { NumberFieldInput } from "reka-ui"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <NumberFieldInput
    data-slot="input"
    :class="cn(
      'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base text-center shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      'in-aria-invalid:ring-destructive/20 dark:in-aria-invalid:ring-destructive/40 in-aria-invalid:border-destructive',
      props.class,
    )"
  />
</template>
