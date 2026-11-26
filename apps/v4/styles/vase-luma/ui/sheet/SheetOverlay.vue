<script setup lang="ts">
import type { DialogBackdropProps } from '@vase-ui/vue/dialog'
import type { HTMLAttributes } from 'vue'
import { Dialog } from '@vase-ui/vue/dialog'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ DialogBackdropProps {
  class?: HTMLAttributes['class']
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
  <Transition @before-enter="onBeforeEnter" @before-leave="onBeforeLeave">
    <Dialog.Backdrop
      data-slot="sheet-overlay"
      v-bind="$attrs"
      :class="cn('bg-black/30 supports-backdrop-filter:backdrop-blur-sm fixed inset-0 z-50 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0', props.class)"
    >
      <slot />
    </Dialog.Backdrop>
  </Transition>
</template>
