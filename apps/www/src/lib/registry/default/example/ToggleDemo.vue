<script setup lang="ts">
import { Bold } from 'lucide-vue-next'

import { Toggle } from '@/lib/registry/default/ui/toggle'
</script>

<template>
  <Toggle aria-label="Toggle bold">
    <Bold class="h-4 w-4" />
  </Toggle>
</template>
