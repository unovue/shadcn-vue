<script setup lang="ts">
import { TabsRoot, type TabsRootProps } from 'radix-vue'

const props = defineProps<TabsRootProps>()
</script>

<template>
  <TabsRoot v-bind="props">
    <slot />
  </TabsRoot>
</template>
