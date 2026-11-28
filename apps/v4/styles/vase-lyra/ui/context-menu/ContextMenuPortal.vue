<script setup lang="ts">
import type { ContextMenuPortalProps } from '@vase-ui/vue/context-menu'
import { ContextMenu } from '@vase-ui/vue/context-menu'

interface Props extends /* @vue-ignore */ ContextMenuPortalProps {}

defineProps<Props>()
</script>

<template>
  <ContextMenu.Portal>
    <slot />
  </ContextMenu.Portal>
</template>
