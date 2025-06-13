<script setup lang="ts">
import { TabsContent } from '@/registry/new-york-v4/ui/tabs'

// Ignore Vue tsc warning as the props will be passed as fallback attribute
</script>

<template>
  <TabsContent class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6">
    <slot />
  </TabsContent>
</template>
