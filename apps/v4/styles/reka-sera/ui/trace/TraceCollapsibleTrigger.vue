<script setup lang="ts">
import type { CollapsibleTriggerProps } from 'reka-ui'

import type { HTMLAttributes } from 'vue'
import { ChevronRightIcon } from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/lib/utils'
import { CollapsibleTrigger } from '@/styles/reka-sera/ui/collapsible'
import TraceIcon from './TraceIcon.vue'

const props = defineProps<CollapsibleTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <CollapsibleTrigger
    data-slot="trace-collapsible-trigger"
    v-bind="delegatedProps"
    :class="cn(
      'gap-1 rounded-none focus-visible:ring-2 focus-visible:ring-ring/30 group/trace-collapsible-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center text-left text-muted-foreground transition-colors outline-none hover:text-foreground has-[[data-status=error]]:text-destructive',
      props.class,
    )"
  >
    <slot />
    <TraceIcon class="transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90">
      <ChevronRightIcon />
    </TraceIcon>
  </CollapsibleTrigger>
</template>
