<script setup lang="ts">
import {
  Marker,
  MarkerContent,
} from '@/registry/bases/reka/ui/marker'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Marker variant="separator">
      <MarkerContent>Today</MarkerContent>
    </Marker>
    <Marker variant="separator">
      <MarkerContent>Worked for 42s</MarkerContent>
    </Marker>
    <Marker variant="separator">
      <MarkerContent>Conversation compacted</MarkerContent>
    </Marker>
  </div>
</template>
