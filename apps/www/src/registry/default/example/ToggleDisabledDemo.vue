<script setup lang="ts">
import { Toggle } from '@/registry/default/ui/toggle'

import { Underline } from 'lucide-vue-next'
</script>

<template>
  <Toggle aria-label="Toggle underline" disabled>
    <Underline class="h-4 w-4" />
  </Toggle>
</template>
