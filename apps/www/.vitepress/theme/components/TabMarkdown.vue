<script setup lang="ts">
import { TabsContent } from '@/lib/registry/default/ui/tabs'

withDefaults(defineProps<{
  title?: string
}>(), {
  title: '',
})
</script>

<template>
  <TabsContent :value="title" class="relative space-y-10">
    <slot />
  </TabsContent>
</template>
