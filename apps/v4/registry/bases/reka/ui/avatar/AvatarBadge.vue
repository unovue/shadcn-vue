<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="avatar-badge"
    :class="cn(
      'bg-background border-background absolute bottom-0 right-0 flex size-3 items-center justify-center rounded-full border-2 [&_svg]:size-2',
      props.class,
    )"
  >
    <slot />
  </span>
</template>
