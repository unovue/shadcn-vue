<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/lib/registry/new-york/ui/resizable'
</script>

<template>
  <ResizablePanelGroup
    id="demo-group-1"
    direction="horizontal"
    class="max-w-md rounded-lg border"
  >
    <ResizablePanel id="demo-panel-1" :default-size="50">
      <div class="flex h-[200px] items-center justify-center p-6">
        <span class="font-semibold">One</span>
      </div>
    </ResizablePanel>
    <ResizableHandle id="demo-handle-1" />
    <ResizablePanel id="demo-panel-2" :default-size="50">
      <ResizablePanelGroup id="demo-group-2" direction="vertical">
        <ResizablePanel id="demo-panel-3" :default-size="25">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Two</span>
          </div>
        </ResizablePanel>
        <ResizableHandle id="demo-handle-2" />
        <ResizablePanel id="demo-panel-4" :default-size="75">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Three</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  </ResizablePanelGroup>
</template>
