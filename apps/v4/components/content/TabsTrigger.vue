<script setup lang="ts">
import { TabsTrigger } from '@/registry/new-york-v4/ui/tabs'

// Ignore Vue tsc warning as the props will be passed as fallback attribute
</script>

<template>
  <TabsTrigger class="text-muted-foreground data-[state=active]:text-foreground px-0 text-base data-[state=active]:shadow-none dark:data-[state=active]:border-transparent dark:data-[state=active]:bg-transparent">
    <slot />
  </TabsTrigger>
</template>
