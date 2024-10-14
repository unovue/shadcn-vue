<script setup lang="ts">
import { Toggle } from '@/lib/registry/new-york/ui/toggle'

import { FontBoldIcon } from '@radix-icons/vue'
</script>

<template>
  <Toggle aria-label="Toggle italic">
    <FontBoldIcon class="h-4 w-4" />
  </Toggle>
</template>
