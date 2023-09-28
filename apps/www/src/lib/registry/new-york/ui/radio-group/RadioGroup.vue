<script setup lang="ts">
import { RadioGroupRoot, type RadioGroupRootEmits, type RadioGroupRootProps, useEmitAsProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<RadioGroupRootProps & { class?: string }>()
const emits = defineEmits<RadioGroupRootEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <RadioGroupRoot :class="cn('grid gap-2', props.class)" v-bind="{ ...props, ...emitsAsProps }">
    <slot />
  </RadioGroupRoot>
</template>
