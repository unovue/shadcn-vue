<script setup lang="ts">
import type { TooltipPopupProps, TooltipPositionerProps } from '@vase-ui/vue/tooltip'
import type { HTMLAttributes } from 'vue'
import { Tooltip } from '@vase-ui/vue/tooltip'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ TooltipPopupProps {
  class?: HTMLAttributes['class']
  side?: TooltipPositionerProps['side']
  sideOffset?: TooltipPositionerProps['sideOffset']
  align?: TooltipPositionerProps['align']
  alignOffset?: TooltipPositionerProps['alignOffset']
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  side: 'top',
  sideOffset: 4,
  align: 'center',
  alignOffset: 0,
})

function onBeforeEnter(el: Element) {
  el.removeAttribute('data-closed')
  el.setAttribute('data-open', '')
}

function onBeforeLeave(el: Element) {
  el.removeAttribute('data-open')
  el.setAttribute('data-closed', '')
}
</script>

<template>
  <Tooltip.Portal>
    <Tooltip.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      class="isolate z-50"
    >
      <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <Tooltip.Popup
          data-slot="tooltip-content"
          v-bind="$attrs"
          :class="cn('data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs has-data-[slot=kbd]:pr-1.5 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-lg data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 w-fit max-w-xs origin-(--transform-origin) bg-foreground text-background', props.class)"
        >
          <slot />

          <Tooltip.Arrow class="size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] data-[side=left]:translate-x-[-1.5px] data-[side=right]:translate-x-[1.5px] data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:translate-x-[1.5px] data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:translate-x-[-1.5px] data-[side=inline-start]:-translate-y-1/2 z-50 bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </Tooltip.Popup>
      </Transition>
    </Tooltip.Positioner>
  </Tooltip.Portal>
</template>
