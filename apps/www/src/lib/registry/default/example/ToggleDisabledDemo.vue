<script setup lang="ts">
import { Underline } from 'lucide-vue-next'

import { Toggle } from '@/lib/registry/default/ui/toggle'
</script>

<template>
  <Toggle aria-label="Toggle underline" disabled>
    <Underline class="w-4 h-4" />
  </Toggle>
</template>
