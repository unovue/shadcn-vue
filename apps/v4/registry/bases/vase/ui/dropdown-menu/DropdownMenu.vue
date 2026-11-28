<script setup lang="ts">
import type { MenuRootEmits, MenuRootProps } from "@vase-ui/vue/menu"
import { Menu } from "@vase-ui/vue/menu"

interface Props extends /* @vue-ignore */ MenuRootProps {}
interface Emits extends /* @vue-ignore */ MenuRootEmits {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Menu.Root v-slot="slotProps">
    <slot v-bind="slotProps" />
  </Menu.Root>
</template>
