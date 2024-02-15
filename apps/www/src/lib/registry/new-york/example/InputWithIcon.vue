<script setup lang="ts">
import { MagnifyingGlassIcon } from '@radix-icons/vue'
import { Input } from '@/lib/registry/new-york/ui/input'
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input id="search" type="text" placeholder="Search..." class="pl-10" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>
