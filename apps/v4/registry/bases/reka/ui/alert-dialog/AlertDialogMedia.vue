<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="alert-dialog-media"
    :class="cn(
      'bg-muted text-muted-foreground mb-2 flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg]:size-5',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
