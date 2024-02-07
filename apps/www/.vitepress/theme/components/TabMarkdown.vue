<script setup lang="ts">
import { useSlots } from 'vue'
import { TabsContent, TabsTrigger } from '@/lib/registry/default/ui/tabs'

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
