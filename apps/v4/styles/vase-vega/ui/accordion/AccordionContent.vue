<script setup lang="ts">
import type { AccordionPanelProps } from '@vase-ui/vue/accordion'
import type { HTMLAttributes } from 'vue'
import { Accordion } from '@vase-ui/vue/accordion'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ AccordionPanelProps {
  class?: HTMLAttributes['class']
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()
</script>

<template>
  <Transition
    enter-active-class="transition-[height] duration-200 ease-out"
    leave-active-class="transition-[height] duration-200 ease-out"
    enter-from-class="h-0"
    enter-to-class="h-(--accordion-panel-height)"
    leave-from-class="h-(--accordion-panel-height)"
    leave-to-class="h-0"
  >
    <Accordion.Panel
      data-slot="accordion-content"
      v-bind="$attrs"
      class="data-open:animate-accordion-down data-closed:animate-accordion-up text-sm overflow-hidden"
    >
      <div
        :class="cn(
          'pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
          props.class,
        )"
      >
        <slot />
      </div>
    </Accordion.Panel>
  </Transition>
</template>
