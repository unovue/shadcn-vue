<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <span
    data-slot="questionnaire-choice-description"
    :class="cn('text-muted-foreground', props.class)"
  >
    <slot />
  </span>
</template>
