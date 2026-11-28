<script setup lang="ts">
import type { PreviewCardPopupProps, PreviewCardPositionerProps } from '@vase-ui/vue/preview-card'
import type { HTMLAttributes } from 'vue'
import { PreviewCard } from '@vase-ui/vue/preview-card'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ PreviewCardPopupProps {
  class?: HTMLAttributes['class']
  side?: PreviewCardPositionerProps['side']
  sideOffset?: PreviewCardPositionerProps['sideOffset']
  align?: PreviewCardPositionerProps['align']
  alignOffset?: PreviewCardPositionerProps['alignOffset']
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
  <PreviewCard.Portal>
    <PreviewCard.Positioner
      :side="side"
      :side-offset="sideOffset"
      :align="align"
      :align-offset="alignOffset"
      class="isolate z-50"
    >
      <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
        <PreviewCard.Popup
          data-slot="hover-card-content"
          v-bind="$attrs"
          :class="cn('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-popover text-popover-foreground w-72 p-4 text-sm shadow-md ring-1 duration-100 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 z-50 origin-(--transform-origin) outline-hidden', props.class)"
        >
          <slot />
        </PreviewCard.Popup>
      </Transition>
    </PreviewCard.Positioner>
  </PreviewCard.Portal>
</template>
