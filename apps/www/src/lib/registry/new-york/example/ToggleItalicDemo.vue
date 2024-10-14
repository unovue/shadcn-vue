<script setup lang="ts">
import { Toggle } from '@/lib/registry/new-york/ui/toggle'

import { FontItalicIcon } from '@radix-icons/vue'
</script>

<template>
  <Toggle variant="outline" aria-label="Toggle italic">
    <FontItalicIcon class="w-4 h-4" />
  </Toggle>
</template>
