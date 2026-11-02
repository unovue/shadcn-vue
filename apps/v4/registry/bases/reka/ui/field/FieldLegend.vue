<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "cn"

const props = withDefaults(defineProps<{
  class?: HTMLAttributes["class"]
  variant?: "legend" | "label"
}>(), {
  variant: "legend",
})
</script>

<template>
  <legend
    data-slot="field-legend"
    :data-variant="variant"
    :class="cn('cn-field-legend', props.class)"
  >
    <slot />
  </legend>
</template>
