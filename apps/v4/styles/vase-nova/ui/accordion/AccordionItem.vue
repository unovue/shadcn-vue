<script setup lang="ts">
import type { AccordionItemEmits, AccordionItemProps } from '@vase-ui/vue/accordion'
import type { HTMLAttributes } from 'vue'
import { Accordion } from '@vase-ui/vue/accordion'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ AccordionItemProps {
  class?: HTMLAttributes['class']
}
interface Emits extends /* @vue-ignore */ AccordionItemEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Accordion.Item
    v-slot="slotProps"
    data-slot="accordion-item"
    :class="cn('not-last:border-b', props.class)"
  >
    <slot v-bind="slotProps" />
  </Accordion.Item>
</template>
