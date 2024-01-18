<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useEmitAsProps,
} from 'radix-vue'
import { Cross2Icon } from '@radix-icons/vue'
import type { PointerDownOutsideEvent } from 'radix-vue/dist/DismissableLayer'
import { cn } from '@/lib/utils'

const props = defineProps<DialogContentProps & { class?: string }>()
const emits = defineEmits<DialogContentEmits>()

const emitsAsProps = useEmitAsProps(emits)

function handlePointerDown(event: PointerDownOutsideEvent) {
  const originalEvent = event.detail.originalEvent
  // Ignore click events on the scrollbar.
  if (originalEvent.offsetX > originalEvent.target?.clientWidth || originalEvent.offsetY > originalEvent.target?.clientHeight)
    event.preventDefault()
}
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <DialogContent
        :class="
          cn(
            'relative z-50 grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full',
            props.class,
          )
        "
        v-bind="{ ...props, ...emitsAsProps }"
        @pointer-down-outside="handlePointerDown"
      >
        <slot />

        <DialogClose
          class="absolute top-4 right-4 p-0.5 transition-colors rounded-md hover:bg-secondary"
        >
          <Cross2Icon class="w-4 h-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>
