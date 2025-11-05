<script setup lang="ts">
import { TabsContent } from '@/registry/default/ui/tabs'

withDefaults(defineProps<{
  title?: string
}>(), {
  title: '',
})
</script>

<template>
  <TabsContent :value="title" class="relative space-y-6">
    <slot />
  </TabsContent>
</template>
