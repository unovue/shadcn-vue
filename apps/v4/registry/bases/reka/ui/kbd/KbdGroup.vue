<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <kbd
    data-slot="kbd-group"
    :class="cn('cn-kbd-group inline-flex items-center', props.class)"
  >
    <slot />
  </kbd>
</template>
