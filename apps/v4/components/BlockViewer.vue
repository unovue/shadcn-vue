<script lang="ts">
import { createContext } from 'reka-ui'

export interface BlockViewerContext {
  item: z.infer<typeof registryItemSchema>
  view: Ref<'code' | 'preview'>
  // setView: (view: 'code' | 'preview') => void
  activeFile: Ref<string | null>
  // setActiveFile: (file: string) => void
  resizablePanelRef: Ref<InstanceType<typeof ResizablePanel> | null>
  tree: ReturnType<typeof createFileTreeForRegistryItemFiles> | null
  highlightedFiles:
    | (z.infer<typeof registryItemFileSchema> & {
      highlightedContent: string
    })[]
    | null
  iframeKey?: Ref<number>
  // setIframeKey?: (key: number) => void
}

export const [useBlockViewer, provideBlockViewerContext] = createContext<BlockViewerContext>('BlockViewer')
</script>

<script setup lang="ts">
import type { SplitterPanel as ResizablePanel } from 'reka-ui'
import type { registryItemFileSchema, registryItemSchema } from 'shadcn-vue/schema'
import type { z } from 'zod'
import type { createFileTreeForRegistryItemFiles } from '~/lib/registry'

const props = defineProps<Pick<BlockViewerContext, 'item' | 'highlightedFiles' | 'tree'>>()

const view = ref<'code' | 'preview'>('preview')
const activeFile = ref(props.highlightedFiles?.[0]?.target ?? null)
const resizablePanelRef = ref<InstanceType<typeof ResizablePanel> | null>(null)
const iframeKey = ref(0)

provideBlockViewerContext({
  view,
  activeFile,
  resizablePanelRef,
  iframeKey,
  item: props.item,
  highlightedFiles: props.highlightedFiles,
  tree: props.tree,
})
</script>

<template>
  <div
    :id="item.name"
    :data-view="view"
    class="group/block-view-wrapper flex min-w-0 scroll-mt-24 flex-col-reverse items-stretch gap-4 overflow-hidden md:flex-col"
    :style=" {
      '--height': item.meta?.iframeHeight ?? '930px',
    }
    "
  >
    <BlockViewerToolbar />
    <BlockViewerView />
    <BlockViewerCode />
    <BlockViewerMobile>
      <slot />
    </BlockViewerMobile>
  </div>
</template>
