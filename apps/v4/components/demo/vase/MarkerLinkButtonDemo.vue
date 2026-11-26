<script setup lang="ts">
import { GitBranchIcon, RotateCcwIcon } from '@lucide/vue'
import { toast } from 'vue-sonner'
import {
  Marker,
  MarkerContent,
  MarkerIcon,
} from '@/styles/vase-luma/ui/marker'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <Marker as="a" href="#links-and-buttons">
      <MarkerIcon>
        <GitBranchIcon />
      </MarkerIcon>
      <MarkerContent>View the pull request</MarkerContent>
    </Marker>
    <Marker as="button" type="button" class="transition-colors hover:text-foreground" @click="() => toast('You clicked the revert button')">
      <MarkerIcon>
        <RotateCcwIcon />
      </MarkerIcon>
      <MarkerContent>Revert this change</MarkerContent>
    </Marker>
  </div>
</template>
