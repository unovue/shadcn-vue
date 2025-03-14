<script setup lang="ts">
import { Toggle } from '@/registry/new-york/ui/toggle'
import { Underline } from 'lucide-vue-next'
</script>

<template>
  <Toggle aria-label="Toggle italic" disabled>
    <Underline class="h-4 w-4" />
  </Toggle>
</template>
