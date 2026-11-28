<script setup lang="ts">
import type { MenuSubmenuRootEmits, MenuSubmenuRootProps } from "@vase-ui/vue/menu"
import { Menu } from "@vase-ui/vue/menu"

interface Props extends /* @vue-ignore */ MenuSubmenuRootProps {}
interface Emits extends /* @vue-ignore */ MenuSubmenuRootEmits {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Menu.SubmenuRoot>
    <slot />
  </Menu.SubmenuRoot>
</template>
