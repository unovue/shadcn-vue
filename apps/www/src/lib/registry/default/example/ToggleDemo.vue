<script setup lang="ts">
import { Bold } from 'lucide-vue-next'

import { Toggle } from '@/lib/registry/default/ui/toggle'
</script>

<template>
  <Toggle aria-label="Toggle italic">
    <Bold class="h-4 w-4" />
  </Toggle>
</template>
