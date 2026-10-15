<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <p
    data-slot="popover-description"
    :class="cn('cn-popover-description', props.class)"
  >
    <slot />
  </p>
</template>
