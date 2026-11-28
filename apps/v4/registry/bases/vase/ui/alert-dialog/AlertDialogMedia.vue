<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="alert-dialog-media"
    :class="cn('cn-alert-dialog-media', props.class)"
  >
    <slot />
  </div>
</template>
