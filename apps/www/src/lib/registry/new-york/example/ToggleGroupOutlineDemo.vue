<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@/lib/registry/new-york/ui/toggle-group'

import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-icons/vue'
</script>

<template>
  <ToggleGroup type="multiple" variant="outline">
    <ToggleGroupItem value="bold" aria-label="Toggle bold">
      <FontBoldIcon class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="Toggle italic">
      <FontItalicIcon class="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="Toggle underline">
      <UnderlineIcon class="h-4 w-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
