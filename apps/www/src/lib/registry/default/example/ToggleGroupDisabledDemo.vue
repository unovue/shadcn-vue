<script setup lang="ts">
import { Bold, Italic, Underline } from 'lucide-vue-next'

import { ToggleGroup, ToggleGroupItem } from '@/lib/registry/default/ui/toggle-group'
</script>

<template>
  <ToggleGroup type="multiple" disabled>
    <ToggleGroupItem value="bold" aria-label="Toggle bold">
      <Bold class="size-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="Toggle italic">
      <Italic class="size-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="Toggle underline">
      <Underline class="size-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
