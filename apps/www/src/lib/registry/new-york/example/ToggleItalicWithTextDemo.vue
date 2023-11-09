<script setup lang="ts">
import { Italic } from 'lucide-vue-next'

import { Toggle } from '@/lib/registry/new-york/ui/toggle'
</script>

<template>
  <Toggle aria-label="Toggle italic">
    <Italic class="w-4 h-4 mr-2" />
    Italic
  </Toggle>
</template>
