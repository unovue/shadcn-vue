<script setup lang="ts">
import { TabsList } from '@/registry/new-york-v4/ui/tabs'
</script>

<template>
  <TabsList class="justify-start gap-4 rounded-none bg-transparent px-2 md:px-0">
    <slot />
  </TabsList>
</template>
