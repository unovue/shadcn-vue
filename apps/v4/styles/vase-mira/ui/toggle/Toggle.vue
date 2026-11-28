<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from '@vase-ui/vue/toggle'
import type { HTMLAttributes } from 'vue'
import type { ToggleVariants } from '.'
import { Toggle } from '@vase-ui/vue/toggle'
import { cn } from 'cn'
import { toggleVariants } from '.'

interface Props extends /* @vue-ignore */ ToggleProps {
  class?: HTMLAttributes['class']
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
}
interface Emits extends /* @vue-ignore */ ToggleEmits {}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
})
defineEmits<Emits>()
</script>

<template>
  <Toggle
    v-slot="slotProps"
    data-slot="toggle"
    :class="cn(toggleVariants({ variant, size }), props.class)"
  >
    <slot v-bind="slotProps" />
  </Toggle>
</template>
