<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="empty-title"
    :class="cn('text-lg font-medium tracking-tight', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
