<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="item-title"
    :class="cn('flex w-fit items-center gap-2 text-sm leading-snug font-medium', props.class)"
  >
    <slot />
  </div>
</template>
