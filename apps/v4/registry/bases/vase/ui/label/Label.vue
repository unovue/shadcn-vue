<script setup lang="ts">
import type { HTMLAttributes, LabelHTMLAttributes } from "vue"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ LabelHTMLAttributes {
  class?: HTMLAttributes["class"]
}

const props = defineProps<Props>()
</script>

<template>
  <label
    data-slot="label"
    :class="
      cn(
        'cn-label flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed peer-has-disabled:cursor-not-allowed peer-has-disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </label>
</template>
