<script lang="ts">
import type { InjectionKey } from 'vue'

export const contextMenuGroupKey: InjectionKey<boolean> = Symbol('contextMenuGroup')
</script>

<script setup lang="ts">
import type { ContextMenuGroupProps } from '@vase-ui/vue/context-menu'
import { ContextMenu } from '@vase-ui/vue/context-menu'
import { provide } from 'vue'

interface Props extends /* @vue-ignore */ ContextMenuGroupProps {}

defineProps<Props>()

provide(contextMenuGroupKey, true)
</script>

<template>
  <ContextMenu.Group data-slot="context-menu-group">
    <slot />
  </ContextMenu.Group>
</template>
