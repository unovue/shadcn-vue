<script setup lang="ts">
import { UnderlineIcon } from '@radix-icons/vue'

import { Toggle } from '@/lib/registry/new-york/ui/toggle'
</script>

<template>
  <Toggle aria-label="Toggle italic" disabled>
    <UnderlineIcon class="size-4" />
  </Toggle>
</template>
