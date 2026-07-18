<script setup lang="ts">
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from '@/registry/bases/reka/ui/marker'
import { Spinner } from '@/registry/new-york-v4/ui/spinner'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Marker role="status">
      <MarkerIcon>
        <Spinner />
      </MarkerIcon>
      <MarkerContent>Compacting conversation</MarkerContent>
    </Marker>
    <Marker variant="separator" role="status">
      <MarkerIcon>
        <Spinner />
      </MarkerIcon>
      <MarkerContent>Running tests</MarkerContent>
    </Marker>
  </div>
</template>
