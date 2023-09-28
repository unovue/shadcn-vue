<script setup lang="ts">
import { CollapsibleRoot, useEmitAsProps } from 'radix-vue'
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'radix-vue'

const props = defineProps<CollapsibleRootProps>()
const emits = defineEmits<CollapsibleRootEmits>()
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="{ ...props, ...useEmitAsProps(emits) }">
    <slot :open="open" />
  </CollapsibleRoot>
</template>
