<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div
    data-slot="attachment-actions"
    :class="cn(
      'cn-attachment-actions flex shrink-0 items-center',
      props.class,
    )"
  >
    <slot />
  </div>
</template>
