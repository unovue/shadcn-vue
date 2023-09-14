<script setup lang="ts">
import { RadioGroupRoot, type RadioGroupRootProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<RadioGroupRootProps & { class?: string }>()
</script>

<template>
  <RadioGroupRoot :class="cn('grid gap-2', props.class)" v-bind="props">
    <slot />
  </RadioGroupRoot>
</template>
