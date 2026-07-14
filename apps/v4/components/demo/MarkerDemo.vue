<script setup lang="ts">
import { GitBranchIcon, SearchIcon } from '@lucide/vue'
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from '@/registry/bases/reka/ui/marker'
import { Spinner } from '@/registry/new-york-v4/ui/spinner'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Marker>
      <MarkerIcon>
        <GitBranchIcon />
      </MarkerIcon>
      <MarkerContent>Switched to a new branch</MarkerContent>
    </Marker>
    <Marker role="status">
      <MarkerIcon>
        <Spinner />
      </MarkerIcon>
      <MarkerContent class="shimmer">
        Thinking...
      </MarkerContent>
    </Marker>
    <Marker variant="separator">
      <MarkerContent>Conversation compacted</MarkerContent>
    </Marker>
    <Marker>
      <MarkerIcon>
        <SearchIcon />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
  </div>
</template>
