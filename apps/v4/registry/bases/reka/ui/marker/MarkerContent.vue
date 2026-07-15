<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

interface Props {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <span
    data-slot="marker-content"
    :class="cn('cn-marker-content min-w-0 wrap-break-word', props.class)"
  >
    <slot />
  </span>
</template>
