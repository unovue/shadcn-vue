<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from 'radix-vue'
import { Toggle, useEmitAsProps } from 'radix-vue'
import type { VariantProps } from 'class-variance-authority'
import { type HTMLAttributes, computed } from 'vue'
import { toggleVariants } from '.'
import { cn } from '@/lib/utils'

interface ToggleVariantProps extends VariantProps<typeof toggleVariants> {}

interface Props extends ToggleProps {
  class?: HTMLAttributes['class']
  variant?: ToggleVariantProps['variant']
  size?: ToggleVariantProps['size']
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
})
const emits = defineEmits<ToggleEmits>()

const delegatedProps = computed(() => {
  const { class: _, size, variant, ...delegated } = props

  return delegated
})
</script>

<template>
  <Toggle
    v-bind="{
      ...delegatedProps,
      ...useEmitAsProps(emits),
    }"
    :class="cn(toggleVariants({ variant, size }), props.class)"
  >
    <slot />
  </Toggle>
</template>
