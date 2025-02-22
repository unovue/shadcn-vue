<script setup lang="ts">
import { Toggle } from '@/registry/new-york/ui/toggle'
import { Italic } from 'lucide-vue-next'
</script>

<template>
  <Toggle variant="outline" aria-label="Toggle italic">
    <Italic class="w-4 h-4" />
  </Toggle>
</template>
