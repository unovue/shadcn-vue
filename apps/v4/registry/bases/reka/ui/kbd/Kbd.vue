<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <kbd
    data-slot="kbd"
    :class="cn('cn-kbd pointer-events-none inline-flex items-center justify-center select-none', props.class)"
  >
    <slot />
  </kbd>
</template>
