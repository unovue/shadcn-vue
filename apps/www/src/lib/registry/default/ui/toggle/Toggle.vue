<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from 'radix-vue'
import { Toggle } from 'radix-vue'
import type { VariantProps } from 'class-variance-authority'
import { computed } from 'vue'
import { toggleVariants } from '.'
import { cn, useEmitAsProps } from '@/lib/utils'

interface ToggleVariantProps extends VariantProps<typeof toggleVariants> {}

interface Props extends ToggleProps {
  variant?: ToggleVariantProps['variant']
  size?: ToggleVariantProps['size']
}
const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
})
const emits = defineEmits<ToggleEmits>()

const toggleProps = computed(() => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { variant, size, ...otherProps } = props
  return otherProps
})
</script>

<template>
  <Toggle
    v-bind="{ ...toggleProps, ...useEmitAsProps(emits) }"
    :class="cn(toggleVariants({ variant, size, class: $attrs.class ?? '' }))"
  >
    <slot />
  </Toggle>
</template>
