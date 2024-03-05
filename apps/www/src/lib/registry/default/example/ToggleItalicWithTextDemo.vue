<script setup lang="ts">
import { Italic } from 'lucide-vue-next'

import { Toggle } from '@/lib/registry/default/ui/toggle'
</script>

<template>
  <Toggle aria-label="Toggle italic">
    <Italic class="w-4 h-4 me-2" />
    Italic
  </Toggle>
</template>
