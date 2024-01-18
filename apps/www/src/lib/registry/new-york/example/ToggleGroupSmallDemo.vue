<script setup lang="ts">
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-icons/vue'

import { ToggleGroup, ToggleGroupItem } from '@/lib/registry/new-york/ui/toggle-group'
</script>

<template>
  <ToggleGroup type="multiple" size="sm">
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
