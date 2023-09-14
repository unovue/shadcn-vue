<script setup lang="ts">
import { ContextMenuRoot } from 'radix-vue'
import type { ContextMenuRootEmits, ContextMenuRootProps } from 'radix-vue'
import { useEmitAsProps } from '@/lib/utils'

const props = defineProps<ContextMenuRootProps>()
const emits = defineEmits<ContextMenuRootEmits>()
</script>

<template>
  <ContextMenuRoot v-bind="{ ...props, ...useEmitAsProps(emits) }">
    <slot />
  </ContextMenuRoot>
</template>
