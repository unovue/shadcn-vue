<script setup lang="ts">
import { ContextMenuPortal, type ContextMenuPortalProps } from 'reka-ui'

const props = defineProps<ContextMenuPortalProps>()
</script>

<template>
  <ContextMenuPortal v-bind="props">
    <slot />
  </ContextMenuPortal>
</template>
