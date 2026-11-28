<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from "@vase-ui/vue/drawer"
import { Drawer } from "@vase-ui/vue/drawer"

interface Props extends /* @vue-ignore */ DrawerRootProps {}
interface Emits extends /* @vue-ignore */ DrawerRootEmits {}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Drawer.Root v-slot="slotProps">
    <slot v-bind="slotProps" />
  </Drawer.Root>
</template>
