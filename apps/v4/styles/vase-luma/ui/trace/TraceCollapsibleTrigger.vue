<script setup lang="ts">
import type { CollapsibleTriggerProps } from '@vase-ui/vue/collapsible'

import type { HTMLAttributes } from 'vue'
import { ChevronRightIcon } from '@lucide/vue'
import { cn } from 'cn'
import { CollapsibleTrigger } from '@/styles/vase-luma/ui/collapsible'
import TraceIcon from './TraceIcon.vue'

interface Props extends /* @vue-ignore */ CollapsibleTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <CollapsibleTrigger
    data-slot="trace-collapsible-trigger"
    :class="cn(
      'gap-1 rounded-lg focus-visible:ring-3 focus-visible:ring-ring/30 group/trace-collapsible-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center text-left text-muted-foreground transition-colors outline-none hover:text-foreground has-[[data-status=error]]:text-destructive',
      props.class,
    )"
  >
    <slot />
    <TraceIcon class="transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90">
      <ChevronRightIcon />
    </TraceIcon>
  </CollapsibleTrigger>
</template>
