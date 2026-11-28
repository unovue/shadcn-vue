<script setup lang="ts">
import type { ToggleGroupEmits, ToggleGroupProps } from '@vase-ui/vue/toggle-group'
import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { toggleVariants } from '@/styles/vase-rhea/ui/toggle'
import { ToggleGroup } from '@vase-ui/vue/toggle-group'
import { cn } from 'cn'
import { provide, reactive, toRef } from 'vue'

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

interface Props extends /* @vue-ignore */ ToggleGroupProps {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
  spacing?: number
}
interface Emits extends /* @vue-ignore */ ToggleGroupEmits {}

const props = withDefaults(defineProps<Props>(), {
  spacing: 0,
})
defineEmits<Emits>()

provide('toggleGroup', reactive({
  variant: toRef(props, 'variant'),
  size: toRef(props, 'size'),
  spacing: toRef(props, 'spacing'),
}))
</script>

<template>
  <ToggleGroup
    v-slot="slotProps"
    data-slot="toggle-group"
    :data-size="size"
    :data-variant="variant"
    :data-spacing="spacing"
    :style="{
      '--gap': spacing,
    }"
    :class="cn('data-[spacing=0]:data-[variant=outline]:rounded-2xl group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-vertical:flex-col data-vertical:items-stretch', props.class)"
  >
    <slot v-bind="slotProps" />
  </ToggleGroup>
</template>
