<script lang="ts">
import type { InjectionKey } from 'vue'

export const dropdownMenuGroupKey: InjectionKey<boolean> = Symbol('dropdownMenuGroup')
</script>

<script setup lang="ts">
import type { MenuGroupProps } from '@vase-ui/vue/menu'
import { Menu } from '@vase-ui/vue/menu'
import { provide } from 'vue'

interface Props extends /* @vue-ignore */ MenuGroupProps {}

defineProps<Props>()

provide(dropdownMenuGroupKey, true)
</script>

<template>
  <Menu.Group data-slot="dropdown-menu-group">
    <slot />
  </Menu.Group>
</template>
