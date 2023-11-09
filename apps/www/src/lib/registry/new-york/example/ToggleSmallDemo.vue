<script setup lang="ts">
import { Italic } from 'lucide-vue-next'

import { Toggle } from '@/lib/registry/new-york/ui/toggle'
</script>

<template>
  <Toggle size="sm" aria-label="Toggle italic">
    <Italic class="w-4 h-4" />
  </Toggle>
</template>
