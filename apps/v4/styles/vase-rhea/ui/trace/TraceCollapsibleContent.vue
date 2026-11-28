<script setup lang="ts">
import type { CollapsiblePanelProps } from '@vase-ui/vue/collapsible'
import type { HTMLAttributes } from 'vue'
import { cn } from 'cn'
import { CollapsibleContent } from '@/styles/vase-rhea/ui/collapsible'

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
      :class="cn('mt-2 mb-1 ml-[calc(--spacing(2)-1px)] border-l pr-1 pl-4 leading-relaxed min-w-0 wrap-break-word text-muted-foreground', props.class)"
    >
      <slot />
    </div>
  </CollapsibleContent>
</template>
