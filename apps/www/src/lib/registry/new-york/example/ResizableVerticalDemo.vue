<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/lib/registry/new-york/ui/resizable'
</script>

<template>
  <ResizablePanelGroup
    id="vertical-demo-group-1"
    direction="vertical"
    class="min-h-[200px] max-w-md rounded-lg border"
  >
    <ResizablePanel id="vertical-demo-panel-1" :default-size="25">
      <div class="flex h-full items-center justify-center p-6">
        <span class="font-semibold">Header</span>
      </div>
    </ResizablePanel>
    <ResizableHandle id="vertical-demo-handle-1" />
    <ResizablePanel id="vertical-demo-panel-2" :default-size="75">
      <div class="flex h-full items-center justify-center p-6">
        <span class="font-semibold">Content</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
