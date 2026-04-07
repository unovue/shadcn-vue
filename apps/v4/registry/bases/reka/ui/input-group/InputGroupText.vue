<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    :class="cn(
      'cn-input-group-text flex items-center [&_svg]:pointer-events-none',
      props.class,
    )"
  >
    <slot />
  </span>
</template>
