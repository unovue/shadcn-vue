<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    data-slot="input-otp-group"
    :class="cn('has-aria-invalid:border-b-destructive dark:has-aria-invalid:border-b-destructive/50 rounded-none gap-1 flex items-center', props.class)"
  >
    <slot />
  </div>
</template>
