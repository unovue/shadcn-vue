<script setup lang="ts">
import { Toggle } from '@/registry/new-york/ui/toggle'
import { Italic } from 'lucide-vue-next'
</script>

<template>
  <Toggle size="sm" aria-label="Toggle italic">
    <Italic class="h-4 w-4" />
  </Toggle>
</template>
