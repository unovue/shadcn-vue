<script setup lang="ts">
import type { ContextMenuRootEmits, ContextMenuRootProps } from '@vase-ui/vue/context-menu'
import { ContextMenu } from '@vase-ui/vue/context-menu'

interface Props extends /* @vue-ignore */ ContextMenuRootProps {}
interface Emits extends /* @vue-ignore */ ContextMenuRootEmits {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <ContextMenu.Root>
    <slot />
  </ContextMenu.Root>
</template>
