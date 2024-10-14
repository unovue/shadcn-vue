<script setup lang="ts">
import { Input } from '@/lib/registry/default/ui/input'
import { Search } from 'lucide-vue-next'
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input id="search" type="text" placeholder="Search..." class="pl-10" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>
