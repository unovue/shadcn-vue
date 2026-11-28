<script setup lang="ts">
import type { ContextMenuSubmenuRootEmits, ContextMenuSubmenuRootProps } from '@vase-ui/vue/context-menu'
import { ContextMenu } from '@vase-ui/vue/context-menu'

interface Props extends /* @vue-ignore */ ContextMenuSubmenuRootProps {}
interface Emits extends /* @vue-ignore */ ContextMenuSubmenuRootEmits {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <ContextMenu.SubmenuRoot>
    <slot />
  </ContextMenu.SubmenuRoot>
</template>
