<script setup lang="ts">
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarProvider,
} from '@/registry/new-york-v4/ui/sidebar'
import { useBlockViewer } from './BlockViewer.vue'

const { tree } = useBlockViewer()
</script>

<template>
  <SidebarProvider v-if="tree" class="flex !min-h-full flex-col border-r">
    <Sidebar collapsible="none" class="w-full flex-1">
      <SidebarGroupLabel class="h-12 rounded-none border-b px-4 text-sm">
        Files
      </SidebarGroupLabel>
      <SidebarGroup class="p-0">
        <SidebarGroupContent>
          <SidebarMenu class="translate-x-0 gap-1.5">
            <BlockViewerTree v-for="(file, index) in tree" :key="index" :item="file" :index="1" />
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </Sidebar>
  </SidebarProvider>
</template>
