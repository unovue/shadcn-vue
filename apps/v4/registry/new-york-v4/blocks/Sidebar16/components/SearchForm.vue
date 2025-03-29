<script setup lang="ts">
import { Label } from '@/registry/new-york-v4/ui/label'

import { SidebarInput } from '@/registry/new-york-v4/ui/sidebar'
import { Search } from 'lucide-vue-next'
</script>

<template>
  <form>
    <div class="relative">
      <Label for="search" class="sr-only">
        Search
      </Label>
      <SidebarInput
        id="search"
        placeholder="Type to search..."
        class="h-8 pl-7"
      />
      <Search class="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
    </div>
  </form>
</template>
