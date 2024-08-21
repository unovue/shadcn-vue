<script setup lang="ts">
import { FontItalicIcon } from '@radix-icons/vue'

import { Toggle } from '@/lib/registry/new-york/ui/toggle'
</script>

<template>
  <Toggle aria-label="Toggle italic">
    <FontItalicIcon class="size-4 mr-2" />
    Italic
  </Toggle>
</template>
