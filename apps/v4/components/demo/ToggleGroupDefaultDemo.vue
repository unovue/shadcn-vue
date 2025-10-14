<script setup lang="ts">
import { Bold, Italic, Underline } from 'lucide-vue-next'

import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/registry/new-york-v4/ui/toggle-group'
</script>

<template>
  <ToggleGroup type="multiple">
    <ToggleGroupItem value="bold" aria-label="Toggle bold">
      <Bold class="size-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="Toggle italic">
      <Italic class="size-4" />
    </ToggleGroupItem>
    <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
      <Underline class="size-4" />
    </ToggleGroupItem>
  </ToggleGroup>
</template>
