<script lang="ts">
import type { InjectionKey } from 'vue'

export const menubarGroupKey: InjectionKey<boolean> = Symbol('menubarGroup')
</script>

<script setup lang="ts">
import type { MenuGroupProps } from '@vase-ui/vue/menu'
import { Menu } from '@vase-ui/vue/menu'
import { provide } from 'vue'

interface Props extends /* @vue-ignore */ MenuGroupProps {}

defineProps<Props>()

provide(menubarGroupKey, true)
</script>

<template>
  <Menu.Group data-slot="menubar-group">
    <slot />
  </Menu.Group>
</template>
