<script setup lang="ts">
import {
  Marker,
  MarkerContent,
} from '@/registry/bases/reka/ui/marker'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Marker>
      <MarkerContent>A default marker for inline notes.</MarkerContent>
    </Marker>
    <Marker variant="separator">
      <MarkerContent>A separator marker</MarkerContent>
    </Marker>
    <Marker variant="border">
      <MarkerContent>A border marker for row boundaries.</MarkerContent>
    </Marker>
  </div>
</template>
