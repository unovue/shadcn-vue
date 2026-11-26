<script setup lang="ts">
import type { CollapsiblePanelProps } from '@vase-ui/vue/collapsible'
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { CollapsibleContent } from '@/styles/vase-mira/ui/collapsible'

interface Props extends /* @vue-ignore */ CollapsiblePanelProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <CollapsibleContent
    data-slot="trace-collapsible-content"
    class="duration-200 min-w-0"
  >
    <div
      data-slot="trace-collapsible-content-inner"
      :class="cn('mt-1.5 mb-1 ml-[calc(--spacing(1.75)-1px)] border-l pr-1 pl-3.75 min-w-0 wrap-break-word text-muted-foreground', props.class)"
    >
      <slot />
    </div>
  </CollapsibleContent>
</template>
