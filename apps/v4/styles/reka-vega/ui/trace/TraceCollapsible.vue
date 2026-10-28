<script setup lang="ts">
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { cn } from 'cn'
import { useForwardPropsEmits } from 'reka-ui'
import { Collapsible } from '@/styles/reka-vega/ui/collapsible'

const props = defineProps<CollapsibleRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<CollapsibleRootEmits>()

const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <Collapsible
    v-slot="slotProps"
    data-slot="trace-collapsible"
    v-bind="forwarded"
    :class="cn('flex w-full min-w-0 flex-col', props.class)"
  >
    <slot v-bind="slotProps" />
  </Collapsible>
</template>
