<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="avatar-group-count"
    :class="cn(
      'bg-muted text-muted-foreground inline-flex size-10 items-center justify-center rounded-full text-xs font-medium ring-2 ring-background',
      props.class,
    )"
  >
    <slot />
  </span>
</template>
