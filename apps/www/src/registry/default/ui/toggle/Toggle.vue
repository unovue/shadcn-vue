<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { type ToggleVariants, toggleVariants } from '.'

const props = withDefaults(defineProps<ToggleProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
}>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
})

const emits = defineEmits<ToggleEmits>()

const delegatedProps = computed(() => {
  const { class: _, size, variant, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Toggle
    v-bind="forwarded"
    :class="cn(toggleVariants({ variant, size }), props.class)"
  >
    <slot />
  </Toggle>
</template>
