<script setup lang="ts">
import { Skeleton } from '@/lib/registry/default/ui/skeleton'
</script>

<template>
  <div class="flex items-center space-x-4">
    <Skeleton class="size-12 rounded-full" />
    <div class="space-y-2">
      <Skeleton class="h-4 w-[250px]" />
      <Skeleton class="h-4 w-[200px]" />
    </div>
  </div>
</template>
