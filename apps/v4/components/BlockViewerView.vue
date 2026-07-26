<script setup lang="ts">
import { SplitterPanel as ResizablePanel } from 'reka-ui'
import { ResizableHandle, ResizablePanelGroup } from '~/registry/new-york-v4/ui/resizable'
import { useBlockViewer } from './BlockViewer.vue'

const { resizablePanelRef } = useBlockViewer()
</script>

<template>
  <div class="hidden group-data-[view=code]/block-view-wrapper:hidden md:h-(--height) lg:flex">
    <div class="relative grid w-full gap-4">
      <div class="absolute inset-0 right-4 [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:20px_20px] dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]" />
      <ResizablePanelGroup
        direction="horizontal"
        class="after:bg-surface/50 relative z-10 after:absolute after:inset-0 after:right-3 after:z-0 after:rounded-xl"
      >
        <ResizablePanel
          ref="resizablePanelRef"
          data-slot="resizable-panel"
          class="bg-background relative aspect-[4/2.5] overflow-hidden rounded-lg border md:aspect-auto md:rounded-xl"
          :default-size="100"
          :min-size="30"
        >
          <BlockViewerIframe />
        </ResizablePanel>
        <ResizableHandle class="after:bg-border relative hidden w-3 bg-transparent p-0 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-[6px] after:translate-x-[-1px] after:-translate-y-1/2 after:rounded-full after:transition-all after:hover:h-10 md:block" />
        <ResizablePanel :default-size="0" :min-size="0" />
      </ResizablePanelGroup>
    </div>
  </div>
</template>
