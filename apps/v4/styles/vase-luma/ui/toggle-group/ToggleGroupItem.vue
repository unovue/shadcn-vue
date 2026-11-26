<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from '@vase-ui/vue/toggle'
import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import { Toggle } from '@vase-ui/vue/toggle'
import { cn } from 'cn'
import { inject } from 'vue'
import { toggleVariants } from '@/styles/vase-luma/ui/toggle'

type ToggleGroupVariants = VariantProps<typeof toggleVariants> & {
  spacing?: number
}

interface Props extends /* @vue-ignore */ ToggleProps {
  class?: HTMLAttributes['class']
  variant?: ToggleGroupVariants['variant']
  size?: ToggleGroupVariants['size']
}
interface Emits extends /* @vue-ignore */ ToggleEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()

const context = inject<ToggleGroupVariants>('toggleGroup')
</script>

<template>
  <Toggle
    v-slot="slotProps"
    data-slot="toggle-group-item"
    :data-variant="context?.variant || variant"
    :data-size="context?.size || size"
    :data-spacing="context?.spacing"
    :class="cn(
      'data-[state=on]:bg-muted group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-3 group-data-[spacing=0]/toggle-group:shadow-none group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-3xl group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-3xl group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-3xl group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-3xl group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-2.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-2.5 shrink-0 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
      toggleVariants({
        variant: context?.variant || variant,
        size: context?.size || size,
      }),
      props.class)"
  >
    <slot v-bind="slotProps" />
  </Toggle>
</template>
