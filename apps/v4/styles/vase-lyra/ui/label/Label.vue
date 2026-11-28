<script setup lang="ts">
import type { HTMLAttributes, LabelHTMLAttributes } from 'vue'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ LabelHTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <label
    data-slot="label"
    :class="
      cn(
        'gap-2 text-xs leading-none group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed peer-has-disabled:cursor-not-allowed peer-has-disabled:opacity-50',
        props.class,
      )
    "
  >
    <slot />
  </label>
</template>
