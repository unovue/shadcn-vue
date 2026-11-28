<script setup lang="ts">
import type { AccordionRootEmits, AccordionRootProps } from '@vase-ui/vue/accordion'
import type { HTMLAttributes } from 'vue'
import { Accordion } from '@vase-ui/vue/accordion'
import { cn } from 'cn'

interface Props extends /* @vue-ignore */ AccordionRootProps {
  class?: HTMLAttributes['class']
}
interface Emits extends /* @vue-ignore */ AccordionRootEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Accordion.Root
    v-slot="slotProps"
    data-slot="accordion"
    :class="cn('flex w-full flex-col', props.class)"
  >
    <slot v-bind="slotProps" />
  </Accordion.Root>
</template>
