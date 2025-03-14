<script setup lang="ts">
import { Toggle } from '@/registry/default/ui/toggle'

import { Italic } from 'lucide-vue-next'
</script>

<template>
  <Toggle variant="outline" aria-label="Toggle italic">
    <Italic class="h-4 w-4" />
  </Toggle>
</template>
