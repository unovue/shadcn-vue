<script setup lang="ts">
import { FontItalicIcon } from '@radix-icons/vue'

import { Toggle } from '@/lib/registry/new-york/ui/toggle'
</script>

<template>
  <Toggle size="lg" aria-label="Toggle italic">
    <FontItalicIcon class="size-4" />
  </Toggle>
</template>
