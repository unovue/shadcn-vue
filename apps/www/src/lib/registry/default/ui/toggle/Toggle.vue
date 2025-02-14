<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'
import type { ToggleVariants } from '.'
import { cn } from '@/lib/utils'
import { Toggle, useForwardPropsEmits } from 'radix-vue'
import { computed } from 'vue'
import { toggleVariants } from '.'

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
