<script setup lang="ts">
import type { ResizableHandleProps } from "@vase-ui/vue/resizable"
import type { HTMLAttributes } from "vue"
import { Resizable } from "@vase-ui/vue/resizable"
import { cn } from "cn"

interface Props extends /* @vue-ignore */ ResizableHandleProps {
  class?: HTMLAttributes["class"]
  withHandle?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <Resizable.Handle
    data-slot="resizable-handle"
    :class="cn('cn-resizable-handle relative flex w-px items-center justify-center bg-border ring-offset-background after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 [&[aria-orientation=horizontal]>div]:rotate-90', props.class)"
  >
    <template v-if="props.withHandle">
      <div class="cn-resizable-handle-icon z-10 flex shrink-0">
        <slot />
      </div>
    </template>
  </Resizable.Handle>
</template>
