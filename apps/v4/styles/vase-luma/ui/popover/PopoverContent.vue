<script setup lang="ts">
import type { PopoverPopupProps, PopoverPositionerProps } from '@vase-ui/vue/popover'
import type { HTMLAttributes } from 'vue'
import { Popover } from '@vase-ui/vue/popover'
import { cn } from 'cn'
import { inject } from 'vue'
import { popoverAnchorKey } from './Popover.vue'

interface Props extends /* @vue-ignore */ PopoverPopupProps {
  class?: HTMLAttributes['class']
  side?: PopoverPositionerProps['side']
  sideOffset?: PopoverPositionerProps['sideOffset']
  align?: PopoverPositionerProps['align']
  alignOffset?: PopoverPositionerProps['alignOffset']
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  side: 'bottom',
  sideOffset: 4,
  align: 'center',
  alignOffset: 0,
})

const anchor = inject(popoverAnchorKey, null)

function anchorElement() {
  return anchor?.value ?? undefined
}

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
  <Popover.Portal>
    <Popover.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      :anchor="anchorElement"
      class="isolate z-50"
    >
      <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <Popover.Popup
          data-slot="popover-content"
          v-bind="$attrs"
          :class="
            cn(
              'bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/5 dark:ring-foreground/10 flex flex-col gap-4 rounded-3xl p-4 text-sm shadow-lg ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 w-72 max-w-(--available-width) origin-(--transform-origin) outline-hidden',
              props.class,
            )
          "
        >
          <slot />
        </Popover.Popup>
      </Transition>
    </Popover.Positioner>
  </Popover.Portal>
</template>
