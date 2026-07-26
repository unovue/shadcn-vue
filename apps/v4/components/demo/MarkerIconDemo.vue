<script setup lang="ts">
import { BookOpenCheck, GitBranchIcon, SearchIcon } from '@lucide/vue'
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from '@/registry/bases/reka/ui/marker'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-12 py-12">
    <Marker>
      <MarkerIcon>
        <GitBranchIcon />
      </MarkerIcon>
      <MarkerContent>Switched to a new branch</MarkerContent>
    </Marker>
    <Marker variant="separator">
      <MarkerIcon>
        <SearchIcon />
      </MarkerIcon>
      <MarkerContent>Explored 4 files</MarkerContent>
    </Marker>
    <Marker class="flex-col">
      <MarkerIcon>
        <BookOpenCheck />
      </MarkerIcon>
      <MarkerContent>Syncing completed</MarkerContent>
    </Marker>
  </div>
</template>
