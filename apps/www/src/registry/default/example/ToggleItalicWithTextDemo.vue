<script setup lang="ts">
import { Toggle } from '@/registry/default/ui/toggle'

import { Italic } from 'lucide-vue-next'
</script>

<template>
  <Toggle aria-label="Toggle italic">
    <Italic class="mr-2 h-4 w-4" />
    Italic
  </Toggle>
</template>
