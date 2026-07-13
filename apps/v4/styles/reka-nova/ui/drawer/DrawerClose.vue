<script lang="ts" setup>
import type { DrawerCloseProps } from 'reka-ui'
import { DrawerClose } from 'reka-ui'

const props = defineProps<DrawerCloseProps>()
</script>

<template>
  <DrawerClose
    data-slot="drawer-close"
    v-bind="props"
  >
    <slot />
  </DrawerClose>
</template>
