<script setup lang="ts">
import { CollapsibleRoot } from 'radix-vue'
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'radix-vue'
import { useEmitAsProps } from '@/lib/utils'

const props = defineProps<CollapsibleRootProps>()
const emits = defineEmits<CollapsibleRootEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="{ ...props, ...emitsAsProps }">
    <slot :open="open" />
  </CollapsibleRoot>
</template>
