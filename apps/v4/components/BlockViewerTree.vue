<script setup lang="ts">
import type { FileTree } from '@/lib/registry'
import {
  ChevronRight,
  File,
  Folder,
} from 'lucide-vue-next'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/registry/new-york-v4/ui/collapsible'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/registry/new-york-v4/ui/sidebar'

import { useBlockViewer } from './BlockViewer.vue'

const props = defineProps<{
  item: FileTree
  index: number
}>()

const { activeFile } = useBlockViewer()
</script>

<template>
  <SidebarMenuItem v-if="!item.children">
    <SidebarMenuButton
      :is-active="item.path === activeFile"
      class="hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15 rounded-none pl-(--index) whitespace-nowrap"
      :data-index="index"
      :style="{ '--index': `${index * (index === 2 ? 1.2 : 1.3)}rem` }
      "
      @click="() => {
        if (item.path)
          activeFile = item.path
      }"
    >
      <ChevronRight class="invisible" />
      <File class="h-4 w-4" />
      {{ item.name }}
    </SidebarMenuButton>
  </SidebarMenuItem>

  <SidebarMenuItem v-else>
    <Collapsible
      class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
      default-open
    >
      <CollapsibleTrigger as-child>
        <SidebarMenuButton
          class="hover:bg-muted-foreground/15 focus:bg-muted-foreground/15 focus-visible:bg-muted-foreground/15 active:bg-muted-foreground/15 data-[active=true]:bg-muted-foreground/15 rounded-none pl-(--index) whitespace-nowrap"
          :style="{ '--index': `${index * (index === 1 ? 1 : 1.2)}rem` } "
        >
          <ChevronRight class="transition-transform" />
          <Folder />
          {{ item.name }}
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub class="m-0 w-full translate-x-0 border-none p-0">
          <BlockViewerTree v-for="(subItem, key) in item.children" :key="key" :item="subItem" :index="index + 1" />
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  </SidebarMenuItem>
</template>
