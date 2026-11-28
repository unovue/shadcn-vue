<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Dialog } from '@vase-ui/vue/dialog'
import { cn } from 'cn'
import { Button } from '@/styles/vase-vega/ui/button'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  showCloseButton?: boolean
}>(), {
  showCloseButton: false,
})
</script>

<template>
  <div
    data-slot="dialog-footer"
    :class="cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', props.class)"
  >
    <slot />
    <Dialog.Close v-if="showCloseButton">
      <template #element="{ props: closeProps, elementRef }">
        <Button v-bind="closeProps" :ref="elementRef" variant="outline">
          Close
        </Button>
      </template>
    </Dialog.Close>
  </div>
</template>
