<script setup lang="ts">
import type { ContextMenuPopupProps, ContextMenuPositionerProps } from '@vase-ui/vue/context-menu'
import type { HTMLAttributes } from 'vue'
import { ContextMenu } from '@vase-ui/vue/context-menu'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ ContextMenuPopupProps {
  class?: HTMLAttributes['class']
  side?: ContextMenuPositionerProps['side']
  sideOffset?: ContextMenuPositionerProps['sideOffset']
  align?: ContextMenuPositionerProps['align']
  alignOffset?: ContextMenuPositionerProps['alignOffset']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()

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
  <ContextMenu.Portal>
    <ContextMenu.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      class="isolate z-50 outline-none"
    >
      <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <ContextMenu.Popup
          data-slot="context-menu-sub-content"
          v-bind="$attrs"
          :class="cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-popover text-popover-foreground min-w-32 rounded-md border p-1 shadow-lg duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 cn-menu-target cn-menu-translucent z-50 origin-(--transform-origin) overflow-hidden', props.class)"
        >
          <slot />
        </ContextMenu.Popup>
      </Transition>
    </ContextMenu.Positioner>
  </ContextMenu.Portal>
</template>
