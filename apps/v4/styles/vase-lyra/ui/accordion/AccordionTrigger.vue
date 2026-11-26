<script setup lang="ts">
import type { AccordionTriggerProps } from '@vase-ui/vue/accordion'

import type { HTMLAttributes } from 'vue'
import { ChevronDownIcon, ChevronUpIcon } from '@lucide/vue'
import { Accordion } from '@vase-ui/vue/accordion'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ AccordionTriggerProps {
  class?: HTMLAttributes['class']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
</script>

<template>
  <Accordion.Header class="flex">
    <Accordion.Trigger
      v-bind="$attrs"
      data-slot="accordion-trigger"
      :class="
        cn(
          'focus-visible:ring-ring/50 focus-visible:border-ring focus-visible:after:border-ring **:data-[slot=accordion-trigger-icon]:text-muted-foreground rounded-none py-2.5 text-left text-xs font-medium hover:underline focus-visible:ring-1 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 group/accordion-trigger relative flex flex-1 items-start justify-between border border-transparent transition-all outline-none disabled:pointer-events-none disabled:opacity-50',
          props.class,
        )
      "
    >
      <slot />
      <slot name="icon">
        <ChevronDownIcon data-slot="accordion-trigger-icon" class="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden" />
        <ChevronUpIcon data-slot="accordion-trigger-icon" class="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline" />
      </slot>
    </Accordion.Trigger>
  </Accordion.Header>
</template>
