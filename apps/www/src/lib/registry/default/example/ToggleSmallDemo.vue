<script setup lang="ts">
import { Italic } from 'lucide-vue-next'

import { Toggle } from '@/lib/registry/default/ui/toggle'
</script>

<template>
  <Toggle size="sm" aria-label="Toggle italic">
    <Italic class="size-4" />
  </Toggle>
</template>
